import lume from "lume/mod.ts";
import code_highlight from "lume/plugins/code_highlight.ts";
import date from "lume/plugins/date.ts";
import sitemap from "lume/plugins/sitemap.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import postcss from "lume/plugins/postcss.ts";
import feed from "lume/plugins/feed.ts";

const site = lume({
    src: "./src",
    location: new URL("https://ahmad.0x13.se/"),
    components: {
        variable: "components",
    },
});

site.ignore("README.md");

site.copy("static", ".");

site.use(code_highlight());
site.use(date());
site.use(sitemap());
site.use(tailwindcss({
    options: {
        theme: {
            colors: {
                'black': '#222222',
                'gray': '#434242',
                'whitebg': '#F3EFE0',
                'white': '#F9F5EB',
                'seablue': '#22A39F',
            },
            fontFamily: {
                'sans': ['Poppins', 'sans-serif'],
            },
        },
    },
}));
site.use(postcss());
site.use(feed({
    output: ["/feed.json", "/feed.xml"],
    query: "type=posts",
    info: {
        title: "=site.title",
        description: "=site.description",
    },
    items: {
        title: "=title",
        content: "$.post-body",
    },
}));

export default site;
