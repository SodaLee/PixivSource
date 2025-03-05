@js:
li = [
    {"💯 推荐": "https://api.furrynovel.ink/fav/user/cache"},
    {"🆕 最新": "https://api.furrynovel.ink/pixiv/novels/recent/cache?page={{page}}"},
    {"🔄 随便": "https://furrynovel.ink"},
    {"🆙 更新": "https://cdn.jsdelivr.net/gh/windyhusky/PixivSource@main/linpx.json"},
]

// 格式化发现地址
li.forEach(item => {
    item.title = Object.keys(item)[0]
    item.url = Object.values(item)[0]
    delete item[Object.keys(item)[0]]
    item.style = {}
    item.style.layout_flexGrow = 1
    item.style.layout_flexBasisPercent = 0.15
})
JSON.stringify(li)