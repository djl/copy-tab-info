const prefix = 'copy-tab-info-';
const types = {
    'title': 'Copy tab title',
    'markdown': 'Copy URL/title as Markdown',
};

for (const t in types) {
    browser.contextMenus.create({
        id: prefix + t,
        'title': types[t],
        contexts: ['tab'],
    });
}

browser.menus.onClicked.addListener(function(info, tab) {
    const id = info.menuItemId.split(prefix).slice(-1)[0];
    switch (id) {
    case 'title':
        navigator.clipboard.writeText(tab.title).then(function () {
            console.log('Copied title to clipboard');
        });
        break;
    case 'markdown':
        const s = `[${tab.url}](${tab.title})`;
        navigator.clipboard.writeText(s).then(function () {
            console.log('Copied URL/title as Markdown to clipboard.');
        });
        break;
    }
});
