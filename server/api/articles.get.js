export default defineEventHandler(async (event) => {
    const articlesFromCookie = getCookie(event, 'articles');

    const query = await getQuery(event)
    const page = Math.max(parseInt(query.page) || 1, 1)
    const pageSize = Math.min(Math.max(parseInt(query.pageSize) || 10, 1), 100)
    
    if (articlesFromCookie) {
        // 回傳分頁指定數量的文章
        // return JSON.parse(articlesFromCookie);

        const articles = JSON.parse(articlesFromCookie);
       
        const start = (page - 1) * pageSize
        const end = start + pageSize
        return {
            items: articles.items.slice(start, end),
            page,
            pageSize
        }
    }

    const articles = await new Promise((resolve) => {
        resolve([
            {
                id: 1,
                title: '如何使用 Serverless Framework 部署 Serverless 網站',
                content: 'Serverless Framework 是一個開源框架，讓開發者可以更容易的部署和管理 serverless 應用程式。Serverless Framework 支援多種雲端平台，包括 AWS、Azure、Google Cloud Platform、IBM Cloud、Alibaba Cloud 等等。',
                cover: "https://picsum.photos/id/40/600/400"
            },
        ]);
    })


    setCookie(event, 'articles', JSON.stringify({
        items: articles,
        page,
        pageSize
    }), {
        httpOnly: true, // 讓 Cookie 只能被服務端存取
        path: '/',      // 適用於整個站點
        maxAge: 60 * 60 // Cookie 有效期為 1 小時
    });
  
    return {
        items: articles,
        page,
        pageSize
    }
})