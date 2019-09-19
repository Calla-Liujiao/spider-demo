let { Builder, By, Key } = require('selenium-webdriver')
let currentPage = 1
let maxPage 
let driver = new Builder().forBrowser('chrome').build()

(async function start() {  
    
    // 自动打开百度，并搜索河马程序员
    await driver.get('http://www.lagou.com/')
    // 找到元素，按回车并执行搜索
    await driver.findElement(By.css('#changeCityBox .checkTips .tab.focus')).click()
    await driver.findElement(By.id('#search_input')).sendKeys('前端',Key.RETURN)       
    // 获取总页数
    maxPage = await driver.findElement(By.className('totalNUm')).getText()
    getData(driver)
    
})()

async function getData () {
    while (true) {
        let noError = true
        try {
            let items = await driver.findElements(By.css('.item_con_list .con_list_item'))
            // 迭代数组，获取我们需要的的数据
            let result = []
            items.forEach(async item => {
                // 获取网络位置名称
                let title = await item.findElement(By.css('.p_top h3')).getText()
                // 获取工作地点
                let position = await item.findElement(By.css('.p_top em')).getText()
                // 获取发布时间
                let time = await item.findElement(By.css('.p_top .format-time')).getText()
                // 获取公司名称
                let companyName = await item.findElement(By.css('.company .company_name')).getText()
                // 获取公司链接
                let companyLink = await item.findElement(By.css('.company .company_name a')).getAttribute()
                // 获取公司所在行业
                let industry = await item.findElement(By.css('.company .industry')).getText()
                // 获取薪资待遇
                let money = await item.findElement(By.css('.p_bot .money')).getText()
                // 获取需求背景
                let background = await item.findElement(By.css('.p_bot .li_b_l')).getText()
                // 处理需求背景
                background = background.replace(money, '')
                // 
                let tag = await item.findElement(By.css('.list_item_bot .li_b_l')).getText()
                // 获取福利待遇
                let welfare = await item.findElement(By.css('.list_item_bot .li_b_r')).getText()
        
                arr.push({
                    title,
                    position,
                    time,
                    companyName,
                    companyLink,
                    industry,
                    money,
                    background,
                    tag,
                    welfare
                })
        
            })
            console.log(result)
            // 爬取到一页数据
            currentPage++
            if (currentPage <= maxPage) {
                // 找到下一页按钮，点击，递归调用
                await driver.findElement(By.className('pager_next')).click()
                getDate()
            }
        } catch (e) {
            if (e) noError = false
        } finally {
            if (noError) break
        }
    }

}