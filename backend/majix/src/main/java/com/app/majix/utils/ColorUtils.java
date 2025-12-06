package com.app.majix.utils;

import java.util.HashMap;
import java.util.Map;

public class ColorUtils {

    // 1. The Standard 140 HTML Color Names (Stored in a Static Map)
    private static final Map<String, String> cssColors = new HashMap<>();

    static {
        cssColors.put("black", "#000000"); cssColors.put("silver", "#c0c0c0"); cssColors.put("gray", "#808080");
        cssColors.put("white", "#ffffff"); cssColors.put("maroon", "#800000"); cssColors.put("red", "#ff0000");
        cssColors.put("purple", "#800080"); cssColors.put("fuchsia", "#ff00ff"); cssColors.put("green", "#008000");
        cssColors.put("lime", "#00ff00"); cssColors.put("olive", "#808000"); cssColors.put("yellow", "#ffff00");
        cssColors.put("navy", "#000080"); cssColors.put("blue", "#0000ff"); cssColors.put("teal", "#008080");
        cssColors.put("aqua", "#00ffff"); cssColors.put("orange", "#ffa500"); cssColors.put("aliceblue", "#f0f8ff");
        cssColors.put("antiquewhite", "#faebd7"); cssColors.put("aquamarine", "#7fffd4"); cssColors.put("azure", "#f0ffff");
        cssColors.put("beige", "#f5f5dc"); cssColors.put("bisque", "#ffe4c4"); cssColors.put("blanchedalmond", "#ffebcd");
        cssColors.put("blueviolet", "#8a2be2"); cssColors.put("brown", "#a52a2a"); cssColors.put("burlywood", "#deb887");
        cssColors.put("cadetblue", "#5f9ea0"); cssColors.put("chartreuse", "#7fff00"); cssColors.put("chocolate", "#d2691e");
        cssColors.put("coral", "#ff7f50"); cssColors.put("cornflowerblue", "#6495ed"); cssColors.put("cornsilk", "#fff8dc");
        cssColors.put("crimson", "#dc143c"); cssColors.put("cyan", "#00ffff"); cssColors.put("darkblue", "#00008b");
        cssColors.put("darkcyan", "#008b8b"); cssColors.put("darkgoldenrod", "#b8860b"); cssColors.put("darkgray", "#a9a9a9");
        cssColors.put("darkgreen", "#006400"); cssColors.put("darkgrey", "#a9a9a9"); cssColors.put("darkkhaki", "#bdb76b");
        cssColors.put("darkmagenta", "#8b008b"); cssColors.put("darkolivegreen", "#556b2f"); cssColors.put("darkorange", "#ff8c00");
        cssColors.put("darkorchid", "#9932cc"); cssColors.put("darkred", "#8b0000"); cssColors.put("darksalmon", "#e9967a");
        cssColors.put("darkseagreen", "#8fbc8f"); cssColors.put("darkslateblue", "#483d8b"); cssColors.put("darkslategray", "#2f4f4f");
        cssColors.put("darkslategrey", "#2f4f4f"); cssColors.put("darkturquoise", "#00ced1"); cssColors.put("darkviolet", "#9400d3");
        cssColors.put("deeppink", "#ff1493"); cssColors.put("deepskyblue", "#00bfff"); cssColors.put("dimgray", "#696969");
        cssColors.put("dimgrey", "#696969"); cssColors.put("dodgerblue", "#1e90ff"); cssColors.put("firebrick", "#b22222");
        cssColors.put("floralwhite", "#fffaf0"); cssColors.put("forestgreen", "#228b22"); cssColors.put("gainsboro", "#dcdcdc");
        cssColors.put("ghostwhite", "#f8f8ff"); cssColors.put("gold", "#ffd700"); cssColors.put("goldenrod", "#daa520");
        cssColors.put("greenyellow", "#adff2f"); cssColors.put("grey", "#808080"); cssColors.put("honeydew", "#f0fff0");
        cssColors.put("hotpink", "#ff69b4"); cssColors.put("indianred", "#cd5c5c"); cssColors.put("indigo", "#4b0082");
        cssColors.put("ivory", "#fffff0"); cssColors.put("khaki", "#f0e68c"); cssColors.put("lavender", "#e6e6fa");
        cssColors.put("lavenderblush", "#fff0f5"); cssColors.put("lawngreen", "#7cfc00"); cssColors.put("lemonchiffon", "#fffacd");
        cssColors.put("lightblue", "#add8e6"); cssColors.put("lightcoral", "#f08080"); cssColors.put("lightcyan", "#e0ffff");
        cssColors.put("lightgoldenrodyellow", "#fafad2"); cssColors.put("lightgray", "#d3d3d3"); cssColors.put("lightgreen", "#90ee90");
        cssColors.put("lightgrey", "#d3d3d3"); cssColors.put("lightpink", "#ffb6c1"); cssColors.put("lightsalmon", "#ffa07a");
        cssColors.put("lightseagreen", "#20b2aa"); cssColors.put("lightskyblue", "#87cefa"); cssColors.put("lightslategray", "#778899");
        cssColors.put("lightslategrey", "#778899"); cssColors.put("lightsteelblue", "#b0c4de"); cssColors.put("lightyellow", "#ffffe0");
        cssColors.put("limegreen", "#32cd32"); cssColors.put("linen", "#faf0e6"); cssColors.put("magenta", "#ff00ff");
        cssColors.put("mediumaquamarine", "#66cdaa"); cssColors.put("mediumblue", "#0000cd"); cssColors.put("mediumorchid", "#ba55d3");
        cssColors.put("mediumpurple", "#9370db"); cssColors.put("mediumseagreen", "#3cb371"); cssColors.put("mediumslateblue", "#7b68ee");
        cssColors.put("mediumspringgreen", "#00fa9a"); cssColors.put("mediumturquoise", "#48d1cc"); cssColors.put("mediumvioletred", "#c71585");
        cssColors.put("midnightblue", "#191970"); cssColors.put("mintcream", "#f5fffa"); cssColors.put("mistyrose", "#ffe4e1");
        cssColors.put("moccasin", "#ffe4b5"); cssColors.put("navajowhite", "#ffdead"); cssColors.put("oldlace", "#fdf5e6");
        cssColors.put("olivedrab", "#6b8e23"); cssColors.put("orangered", "#ff4500"); cssColors.put("orchid", "#da70d6");
        cssColors.put("palegoldenrod", "#eee8aa"); cssColors.put("palegreen", "#98fb98"); cssColors.put("paleturquoise", "#afeeee");
        cssColors.put("palevioletred", "#db7093"); cssColors.put("papayawhip", "#ffefd5"); cssColors.put("peachpuff", "#ffdab9");
        cssColors.put("peru", "#cd853f"); cssColors.put("pink", "#ffc0cb"); cssColors.put("plum", "#dda0dd");
        cssColors.put("powderblue", "#b0e0e6"); cssColors.put("rosybrown", "#bc8f8f"); cssColors.put("royalblue", "#4169e1");
        cssColors.put("saddlebrown", "#8b4513"); cssColors.put("salmon", "#fa8072"); cssColors.put("sandybrown", "#f4a460");
        cssColors.put("seagreen", "#2e8b57"); cssColors.put("seashell", "#fff5ee"); cssColors.put("sienna", "#a0522d");
        cssColors.put("skyblue", "#87ceeb"); cssColors.put("slateblue", "#6a5acd"); cssColors.put("slategray", "#708090");
        cssColors.put("slategrey", "#708090"); cssColors.put("snow", "#fffafa"); cssColors.put("springgreen", "#00ff7f");
        cssColors.put("steelblue", "#4682b4"); cssColors.put("tan", "#d2b48c"); cssColors.put("thistle", "#d8bfd8");
        cssColors.put("tomato", "#ff6347"); cssColors.put("turquoise", "#40e0d0"); cssColors.put("violet", "#ee82ee");
        cssColors.put("wheat", "#f5deb3"); cssColors.put("whitesmoke", "#f5f5f5"); cssColors.put("yellowgreen", "#9acd32");
    }

    // 2. Helper struct to hold RGB values
    private static class Rgb {
        int r, g, b;
        public Rgb(int r, int g, int b) { this.r = r; this.g = g; this.b = b; }
    }

    // 3. Helper to convert Hex String to RGB object
    private static Rgb hexToRgb(String hex) {
        if (hex.startsWith("#")) hex = hex.substring(1);
        int bigint = Integer.parseInt(hex, 16);
        int r = (bigint >> 16) & 255;
        int g = (bigint >> 8) & 255;
        int b = bigint & 255;
        return new Rgb(r, g, b);
    }

    // 4. The Logic: Find closest color name (Exact Translation of your JS)
    public static String getColorName(String hex) {
        if (hex == null || hex.isEmpty()) return "Unknown";

        // Check for exact match first
        for (Map.Entry<String, String> entry : cssColors.entrySet()) {
            if (entry.getValue().equalsIgnoreCase(hex)) {
                return capitalize(entry.getKey());
            }
        }

        // Nearest Neighbor (Euclidean Distance)
        double minDistance = Double.MAX_VALUE;
        String closestColor = hex;

        try {
            Rgb inputRgb = hexToRgb(hex);

            for (Map.Entry<String, String> entry : cssColors.entrySet()) {
                Rgb targetRgb = hexToRgb(entry.getValue());

                // Calculate Euclidean distance
                double distance = Math.sqrt(
                        Math.pow(inputRgb.r - targetRgb.r, 2) +
                                Math.pow(inputRgb.g - targetRgb.g, 2) +
                                Math.pow(inputRgb.b - targetRgb.b, 2)
                );

                if (distance < minDistance) {
                    minDistance = distance;
                    closestColor = entry.getKey();
                }
            }
        } catch (Exception e) {
            // Fallback if hex parsing fails (e.g. invalid hex code)
            return hex;
        }

        return capitalize(closestColor);
    }

    private static String capitalize(String str) {
        if (str == null || str.isEmpty()) return str;
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }
}