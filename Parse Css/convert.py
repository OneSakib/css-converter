import re
import cssutils

# Optional: set formatting preferences
cssutils.ser.prefs.indent = '  '  # 2 spaces
cssutils.ser.prefs.keepAllProperties = True
cssutils.ser.prefs.omitLastSemicolon = False


def px_to_vw(px_value, base=1440):
    vw = (float(px_value) / base) * 100
    return f"{vw:.2f}vw"


def rem_to_vw(px_value, base=1440):
    vw = ((float(px_value)*16) / base) * 100
    return f"{vw:.2f}vw"


# Load and parse the CSS
with open('style.css', 'r') as f:
    css = f.read()

pattern_px = re.compile(r'(\d+)px')
pattern_rem = re.compile(r'(\d+)rem|(\d+)em')

converted_css_px = pattern_px.sub(lambda m: px_to_vw(m.group(1)), css)
converted_css_rem = pattern_rem.sub(
    lambda m: rem_to_vw(m.group(1)), converted_css_px)

sheet = cssutils.parseString(converted_css_rem)
# Pretty-print the CSS
pretty_css = sheet.cssText.decode('utf-8')

# Optional: Save to a new file
with open('style.css', 'w') as f:
    f.write(pretty_css)
