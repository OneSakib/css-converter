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
            decl = decl.strip()
            if not decl or ":" not in decl:
                continue  # skip empty or invalid            
            prop, val = decl.split(":", 1)
            prop = prop.strip()
            prop=prop.replace('*/','')
            prop=prop.replace('/*','')
            val = val.strip()
            if bool(re.search(r'\b\d+(\.\d+)?px\b', val)):
                px_values = re.findall(r'(\d+(\.\d+)?|\d+)px', val)
                for px_val, _ in px_values:
                    val = val.replace(f"{px_val}px", px_to_vw(px_val))                                
                converted_declarations.append(f"  {prop}: {val};")

            elif bool(re.search(r'\b\d+(\.\d+)?rem\b', val)):
                rem_values = re.findall(r'(\d+(\.\d+)?)rem', val)
                for rem_val, _ in rem_values:
                    val = val.replace(f"{rem_val}rem", rem_to_vw(rem_val))
                converted_declarations.append(f"  {prop}: {val};")

            elif bool(re.search(r'\b\d+(\.\d+)?em\b', val)):
                em_values = re.findall(r'(\d+(\.\d+)?)em', val)
                for em_val, _ in em_values:
                    val = val.replace(f"{em_val}em", rem_to_vw(em_val))  # treat same as rem
                converted_declarations.append(f"  {prop}: {val};")

        if converted_declarations:
            result.append(
                f"  {selector} {{\n" + "\n".join(converted_declarations) + "\n  }")
    return '\n'.join(result)


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
