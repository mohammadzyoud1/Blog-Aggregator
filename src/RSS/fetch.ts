
import { XMLParser } from "fast-xml-parser";
export async function fetch_RSS_feed(URL: string) {
    let title = "";
    let link = "";
    let description = "";
    let items: any[] = [];

    try {
        const res = await fetch(URL, {
            method: "GET",
            headers: {
                "User-Agent": "gator"
            }
        })
        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
        }
        const data_xml = await res.text();
        const parser = new XMLParser();
        const json_obj = parser.parse(data_xml);
        const channel = json_obj?.rss?.channel;
        if (channel) {
            if (channel.title) {
                title = channel.title;
            }
            if (channel.link) {
                link = channel.link;
            }
            if (channel.description) {
                description = channel.description;
            }



        }
        else {
            throw new Error(" Missing 'channel' element");
        }

        if (Array.isArray(channel.item)) {
            items = channel.item;
        }
        else if (channel.item) {
            items = [channel.item];
        }
        else {
            items = [];
        }

        return {
            title,
            link,
            description,
            items: items.map(item => ({
                title: item.title || "",
                link: item.link || "",
                description: item.description || "",
                pubDate: item.pubDate || ""
            }))
        };
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
        throw error;
    }

}
