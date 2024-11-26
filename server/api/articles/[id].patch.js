export default defineEventHandler(async (event) => {
    if (event.context?.auth?.user?.id !== 1) {
        throw createError({
          statusCode: 401,
          message: '沒有權限'
        })
    }

    const id = getRouterParam(event, 'id');
    const body = await readBody(event);

    const cookieData = getCookie(event, 'articles');
    const articles = cookieData ? JSON.parse(cookieData) : [];

    const index = articles.items.findIndex((article) => article.id == id);

    if (index === -1) {
        throw createError({
            statusCode: 404,
            statusMessage: '找不到文章'
        })
    }

    articles.items[index] = { id, ...body };

    setCookie(event, 'articles', JSON.stringify(articles), {
        httpOnly: true,
    });

    return articles.items[index];

});