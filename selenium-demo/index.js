let { Builder, By, Key, until } = require('selenium-webdriver')

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build()
    try {
        // 自动打开百度，并搜索河马程序员
        await driver.get('http://www.baidu.com')
        // 找到元素，按回车并执行搜索
        await driver.findElement(By.id('kw')).sendKeys('黑马程序员', Key.RETURN)
        // 验证搜索是否成功
        await driver.wait(until.titleIs('黑马程序员 - 百度搜索'), 1000)
    } finally {
        // 退出
        // await driver.quit()
    }
})()