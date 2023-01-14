@js:

var util = {}

function objStringify(obj) {
    return JSON.stringify(obj, (n, v) => {
        if (typeof v == "function")
            return v.toString();
        return v;
    });
}

function urlCoverUrl(url) {
    return `${url},{"headers": {"Referer":"https://www.pixiv.net/"}}`
}

// 存储seriesID
var seriesSet = new Set();

// 将多个长篇小说解析为一本书
function combineNovels(novels) {
    return novels.filter(novel => {
        //单本直接解析为一本书
        if (novel.seriesId === undefined || novel.seriesId === null) {
            return true
        }

        //集合中没有该系列解析为一本书
        if (!seriesSet.has(novel.seriesId)) {
            seriesSet.add(novel.seriesId)
            return true
        }

        return false
    })
}

//处理novels列表
//查询作者
function handNovels(novels) {
    novels.forEach(novel => {
        if (novel.tags === undefined || novel.tags === null) {
            novel.tags = []
        }

        if (novel.seriesId === undefined || novel.seriesId === null) {
            novel.tags.unshift("单本")
        } else {
            novel.tags.unshift("长篇")
            // todo 暂时不做字数统计
            novel.textCount = null
        }
    })
    return novels
}

function formatNovels(novels) {
    novels.forEach(novel => {
        novel.detailedUrl = util.urlNovelDetailed(novel.id)
        novel.tags = novel.tags.join(",")
        novel.coverUrl = urlCoverUrl(novel.url)
    })
    return novels
}

// 暂时不做
function getUserNovels(username) {
    return []
}

// 存储函数方便其他页面调用
function init() {
    let u = {}

    u.cacheGetAndSet = (key, supplyFunc) => {
        let v = cache.get(key)
        if (v === undefined || v === null) {
            v = JSON.stringify(supplyFunc())
            // 缓存10分钟
            cache.put(key, v, 600)
        }
        return JSON.parse(v)
    }
    u.debugFunc = (func) => {
        if (String(source.getVariable()) === "debug") {
            func()
        }
    }

    u.urlNovelDetailed = (nid) => {
        return `https://www.pixiv.net/ajax/novel/${nid}`
    }
    u.urlSeries = (seriesId) => {
        return `https://www.pixiv.net/ajax/novel/series/${seriesId}?lang=zh`
    }
    u.urlSeriesNovels = (seriesId, limit, offset) => {
        if (limit > 30) {
            limit = 30
        }

        if (limit < 10) {
            limit = 10
        }

        return `https://www.pixiv.net/ajax/novel/series_content/${seriesId}?limit=${limit}&last_order=${offset}&order_by=asc&lang=zh`
    }
    util = u
    java.put("util", objStringify(u))
}

(() => {
    //作者 TAG 书名都要支持
    init()
    let resp = JSON.parse(result);
    let novelsList = getUserNovels(String(java.get("key")))
    novelsList = novelsList.concat(resp.body.novel.data)
    return formatNovels(handNovels(combineNovels(novelsList)))
})();