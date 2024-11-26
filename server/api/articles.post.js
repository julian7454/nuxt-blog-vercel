export default defineEventHandler(async (event) => {
    if (event.context?.auth?.user?.id !== 1) {
        throw createError({
          statusCode: 401,
          message: '沒有權限'
        })
    }

    const body = await readBody(event);

    // 從 Cookie 中讀取現有的文章列表
    const cookieData = getCookie(event, 'articles');
    const articles = cookieData ? JSON.parse(cookieData) : [];

    // 新增新文章
    const newArticle = { id: articles.items.length + 1, ...body };
    articles.items.push(newArticle);

    // 將更新後的資料寫回 Cookie
    setCookie(event, 'articles', JSON.stringify(articles), {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60
    });

    return newArticle;
});