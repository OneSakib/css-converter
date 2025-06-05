import re
import cssutils

# Optional: set formatting preferences
cssutils.ser.prefs.indent = '  '  # 2 spaces
cssutils.ser.prefs.keepAllProperties = True
cssutils.ser.prefs.omitLastSemicolon = False


def extract_blocks(css):
    """
    Separates the top-level CSS and all @media blocks.
    Returns:
        base_blocks (str): CSS outside media queries.
        media_blocks (dict): {media_query: css_inside}
    """
    media_pattern = re.compile(
        r'@media[^{]+\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}', re.DOTALL)
    media_blocks = {}

    # Extract all media blocks
    for match in media_pattern.finditer(css):
        full_media = match.group()
        header = full_media[:full_media.find('{')].strip()
        body = full_media[len(header):].strip()[1:-1]  # Remove outer { }

        media_blocks[header] = body.strip()
    # Remove media blocks from base CSS
    base_css = media_pattern.sub('', css).strip()
    return base_css, media_blocks


def remove_duplicates(css_block):
    """
    Removes duplicate selector blocks within a CSS chunk.
    """
    pattern = re.compile(r'([^{]+)\{([^}]+)\}', re.MULTILINE)
    seen = set()
    unique = []

    for match in pattern.finditer(css_block):
        selector = match.group(1).strip()
        body = match.group(2).strip()
        key = f"{selector}{{{body}}}"
        if key not in seen:
            seen.add(key)
            unique.append(f"{selector} {{\n  {body}\n}}")
    return "\n\n".join(unique)


def process_css(css):
    base_css, media_blocks = extract_blocks(css)
    # print(">>base_css", base_css)
    # print(">>media_blocks", media_blocks)
    # Clean base CSS
    cleaned_base = remove_duplicates(base_css)

    # Clean media blocks
    cleaned_media = []
    # print(">>>>", media_blocks.items())
    for media_query, block_css in media_blocks.items():
        # print(">>>>>block_css", block_css)
        cleaned_block = remove_duplicates(block_css)
        # print("C;ea cs", cleaned_block)
        cleaned_media.append(f"{media_query} {{\n{cleaned_block}\n}}")

    # Combine everything
    return cleaned_base + '\n\n' + '\n\n'.join(cleaned_media)


# Read input
with open('style.css', 'r') as f:
    raw_css = f.read()

# Process it
clean_css = process_css(raw_css)


sheet = cssutils.parseString(clean_css)
# Pretty-print the CSS
pretty_css = sheet.cssText.decode('utf-8')
# Save or print
with open('style_.css', 'w') as f:
    f.write(pretty_css)
