@js:
var util = objParse(String(java.get("util")))
var seriesSet = new Set();  // 存储seriesID

function objParse(obj) {
    return JSON.parse(obj, (n, v) => {
        if (typeof v == "string" && v.match("()")) {
            return eval(`(${v})`)
        }
        return v;
    })
}


/**
 * @params arr 传入的源数组
 * @params length 需要获取的元素的个数
 */
function randomChoseArrayItem(arr, length) {
    let copyArr = JSON.parse(JSON.stringify(arr))
    let newArr = [];
    for (let i = 0; i < length; i++) {
        let index = Math.floor(Math.random() * copyArr.length);
        let item = copyArr[index];
        newArr.push(item)
        copyArr.splice(index, 1)
    }
    return newArr.reverse()
}


function handlerRecommendUsers() {
    const MAX_FETCH_USER_NUMBER = 2;

    return () => {
        let userIds = JSON.parse(result).map(i => i.id)
        // java.log(`用户id个数:${userIds.length}`)
        if (userIds.length > MAX_FETCH_USER_NUMBER) {
            userIds = randomChoseArrayItem(userIds, MAX_FETCH_USER_NUMBER);
        }
        // java.log(`查询的用户Ids:${userIds}`)
        let usersInfo = util.getWebviewJson(util.urlUsersDetailed(userIds))
        // java.log(`返回的${JSON.stringify(usersInfo)}`)
        let queryNovelIds = []
        // java.log(`${JSON.stringify(usersInfo)}`)
        usersInfo.filter(user => user.novels && user.novels.length > 0)
            .map(user => user.novels)
            // 将list展平[1,2,3]变为1,2,3 添加到novelList中
            .forEach(novels => {
                novels.forEach(novel => {
                    queryNovelIds.push(novel)
                })
            })
        // 暂时限制最大获取数量
        if (queryNovelIds.length > 10) {
            queryNovelIds = randomChoseArrayItem(queryNovelIds, 10)
        }
        novelList = util.getWebviewJson(util.urlNovelsDetailed(queryNovelIds))
        return util.formatNovels(util.handNovels(util.combineNovels(novelList)))
    }
}

function handlerFollowLatest() {
    return () => {
        let resp = JSON.parse(result)
        return util.formatNovels(util.handNovels(util.combineNovels(resp)))
    }
}

function handlerFactory() {
    if (baseUrl.indexOf("/fav/user") !== -1) {
        return handlerRecommendUsers()
    }
    if (baseUrl.indexOf("/pixiv/novels/recent") !== -1) {
        return handlerFollowLatest()
    }
}

(() => {
    return handlerFactory()()
})()
