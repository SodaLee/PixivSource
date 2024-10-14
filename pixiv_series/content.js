@js:
var util = objParse(String(java.get("util")))

function objParse(obj) {
    return JSON.parse(obj, (n, v) => {
        if (typeof v == "string" && v.match("()")) {
            return eval(`(${v})`)
        }
        return v;
    })
}

(() => {
    let res = JSON.parse(result).body
    let content = res.content
    // 在正文内部添加小说描述
    if (res.seriesNavData !== undefined && res.seriesNavData !== null && res.description !== "") {
        content = res.description + "\n" + "——————————\n".repeat(2) + content
    }

    // 获取 [uploadedimage:] 的图片链接
    let hasEmbeddedImages = res.textEmbeddedImages !== undefined && res.textEmbeddedImages !== null
    if (hasEmbeddedImages) {
        Object.keys(res.textEmbeddedImages).forEach((key) => {
            // 不再使用 linpx 服务加载图片
            // content = content.replace(`[uploadedimage:${key}]`, `<img src="https://api.furrynovel.ink/proxy/pximg?url=${res.textEmbeddedImages[key].urls.original}">`)
            content = content.replace(`[uploadedimage:${key}]`, `<img src="${res.textEmbeddedImages[key].urls.original}">`)

        })
    }

    // // 获取 [pixivimage:] 的图片链接
    let matched = content.match(RegExp(/\[pixivimage:(\d+)]/gm))
    if (matched) {
        for (let i in matched) {
            let illustId = matched[i].match(RegExp("\\d+"))
            let res2 = util.getAjaxJson(util.urlIllustDetailed(illustId)).body
            let illustOriginal = res2.urls.original
            content = content.replace(`${matched[i]}`, `<img src="${illustOriginal}">`)
        }
    }


    // 替换 Pixiv 分页标记符号 [newpage]
    matched = content.match(RegExp(/[ 　]*\[newpage][ 　]*/gm))
    if (matched) {
        for (let i in matched){
            java.log(matched[i])
            content = content.replace(`${matched[i]}`, `${"<p>​<p/>".repeat(3)}`)
        }
    }

    // 替换 Pixiv 章节标记符号 [chapter:]
    matched = content.match(RegExp(/\[chapter:(.*?)]/gm))
    if (matched) {
        for (let i in matched) {
            let matched2 = matched[i].match(/\[chapter:(.*?)]/m)
            let chapter = matched2[1].trim()
            // content = content.replace(`${matched[i]}`, `${"<p>​<p/>".repeat(3)}${chapter}<p>​<p/>`)
            content = content.replace(`${matched[i]}`, `${chapter}<p>​<p/>`)
        }
    }

    // 替换 Pixiv 跳转页面标记符号 [[jump:]]
    matched = content.match(RegExp(/\[jump:(\d+)]/gm))
    if (matched) {
        for (let i in matched) {
            let page = matched[i].match(/\d+/)
            content = content.replace(`${matched[i]}`, `\n\n跳转至第${page}节`)
        }
    }

    // 替换 Pixiv 链接标记符号 [[jumpuri: > ]]
    matched = content.match(RegExp(/\[\[jumpuri:(.*?)>(.*?)]]/gm))
    if (matched) {
        for (let i in matched) {
            let matched2 = matched[i].match(/\[\[jumpuri:(.*?)>(.*?)]]/m)
            let matchedText = matched2[0]
            let urlName = matched2[1].trim()
            let urlLink = matched2[2].trim()
            // 阅读不支持超链接
            //content = content.replace(`${matchedText}`, `<a href=${urlLink}>${urlName}</a>`)
            if (urlLink === urlName) {
                content = content.replace(`${matchedText}`, `${urlName}`)
            } else {
                content = content.replace(`${matchedText}`, `${urlName}: ${urlLink}`)
            }
        }
    }

    // 替换 Pixiv 注音标记符号 [[rb: > ]]
    matched = content.match(RegExp(/\[\[rb:(.*?)>(.*?)]]/gm))
    if (matched) {
        for (let i in matched) {
            let matched2 = matched[i].match(/\[\[rb:(.*?)>(.*?)]]/m)
            let matchedText = matched2[0]
            let kanji = matched2[1].trim()
            let kana = matched2[2].trim()
            // kana为中文，则替换回《书名号》
            var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
            if (reg.test(kana)) {
                content = content.replace(`${matchedText}`, `${kanji}《${kana}》`)
            } else{
                // 阅读不支持 <ruby> <rt> 注音
                // content = content.replace(`${matchedText}`, `<ruby>${kanji}<rt>${kana}</rt></ruby>`)
                content = content.replace(`${matchedText}`, `${kanji}（${kana}）`)
            }
        }
    }

    return content
})()
