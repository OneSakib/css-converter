import re

import cssutils

# Optional: set formatting preferences
cssutils.ser.prefs.indent = '  '  # 2 spaces
cssutils.ser.prefs.keepAllProperties = True
cssutils.ser.prefs.omitLastSemicolon = False


def px_to_vw(px_value, base=1440):
    px = float(px_value)
    vw = round((px / base) * 100, 2)
    return f"{vw}vw"


def rem_to_vw(px_value, base=1440):
    vw = ((float(px_value)*16) / base) * 100
    return f"{vw:.2f}vw"


def extract_px_css_blocks(css_text):
    pattern = re.compile(r'([^{]+)\{([^}]+)\}', re.MULTILINE)
    result = []

    for match in pattern.finditer(css_text):
        selector = match.group(1).strip()
        declarations = match.group(2).strip().split(";")

        converted_declarations = []
        for decl in declarations:
            if "px" in decl:
                prop, val = decl.strip().split(":", 1)
                px_values = re.findall(r'(\d+(\.\d+)?)px', val)
                if px_values:
                    for px_val, _ in px_values:
                        val = val.replace(f"{px_val}px", px_to_vw(px_val))
                    converted_declarations.append(
                        f"  {prop.strip()}: {val.strip()};")
            elif "rem" in decl:
                prop, val = decl.strip().split(":", 1)
                px_values = re.findall(r'(\d+(\.\d+)?)rem', val)
                if px_values:
                    for px_val, _ in px_values:
                        val = val.replace(f"{px_val}rem", rem_to_vw(px_val))
                    converted_declarations.append(
                        f"  {prop.strip()}: {val.strip()};")
            elif "em" in decl:
                prop, val = decl.strip().split(":", 1)
                px_values = re.findall(r'(\d+(\.\d+)?)em', val)
                if px_values:
                    for px_val, _ in px_values:
                        val = val.replace(f"{px_val}em", rem_to_vw(px_val))
                    converted_declarations.append(
                        f"  {prop.strip()}: {val.strip()};")

        if converted_declarations:
            result.append(
                f"  {selector} {{\n" + "\n".join(converted_declarations) + "\n  }")
    return "@media (min-width: 1400px) {\n" + "\n".join(result) + "\n}"


# Read input
with open('style.css', 'r') as f:
    raw_css = f.read()

# Process it
converted_css = extract_px_css_blocks(raw_css)
sheet = cssutils.parseString(converted_css)
# Pretty-print the CSS
pretty_css = sheet.cssText.decode('utf-8')
# Save or print
with open('style.css', 'w') as f:
    f.write(pretty_css)
