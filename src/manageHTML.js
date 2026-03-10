const fs = require("fs");
const path = require("path");

function buildContentHTML(content) {
    let html = "";
    let inList = false;

    for (const item of content) {
        if (item.type === "header") {
            if (inList) {
                html += "</ul>";
                inList = false;
            }
            html += `<h${item.level}>${item.text}</h${item.level}>`;
        }

        else if (item.type === "paragraph") {
            if (inList) {
                html += "</ul>";
                inList = false;
            }
            html += `<p>${item.text}</p>`;
        }

        else if (item.type === "list") {
            if (!inList) {
                html += "<ul>";
                inList = true;
            }
            html += `<li>${item.text}</li>`;
        }
    }

    if (inList) html += "</ul>";

    return html;
}

function buildFinalHTML(reportData) {
    const templatePath = path.join(__dirname, "../templates/report.html");
    let template = fs.readFileSync(templatePath, "utf8");

    const contentHTML = buildContentHTML(reportData.content);

    const finalHTML = template
        .replace("{{REPORT_TITLE}}", reportData.title)
        .replace("{{SOURCE_URL}}", reportData.url)
        .replace("{{GENERATED_AT}}", reportData.date)
        .replace("{{CONTENT_BLOCK}}", contentHTML);

    return finalHTML;
}

module.exports = { buildFinalHTML };