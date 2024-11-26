export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    console.log('id', id);
    const articleFromCookie = getCookie(event, 'articles');
    

    if (articleFromCookie) {
        console.log('articleFromCookie', articleFromCookie);
        return JSON.parse(articleFromCookie).items.find((article) => article.id == id);
    }


    const article = await new Promise((resolve) => {
        resolve({
            title: '如何使用 Serverless Framework 部署 Serverless 網站',
            content: 'Serverless Framework 是一個開源框架...',
            cover: "https://picsum.photos/id/40/600/400"
        });
    });
    
    if (!article) {
        throw createError({
            statusCode: 404,
            statusMessage: '找不到文章'
        })
    }
    
    return article
})
