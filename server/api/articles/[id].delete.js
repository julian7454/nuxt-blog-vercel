export default defineEventHandler(async (event) => {

    if (event.context?.auth?.user?.id !== 1) {
        throw createError({
          statusCode: 401,
          message: '沒有權限'
        })
    }

    const id = getRouterParam(event, 'id');
    const cookieData = getCookie(event, 'articles');

    if (!cookieData) {
        throw createError({
            statusCode: 404,
            statusMessage: '找不到文章'
        })
    }

    const articles = JSON.parse(cookieData);
    const index = articles.items.findIndex((article) => article.id == id);

    if (index === -1) {
        throw createError({
            statusCode: 404,
            statusMessage: '找不到文章'
        })
    }

    articles.items.splice(index, 1);

    setCookie(event, 'articles', JSON.stringify(articles), {
        httpOnly: true,
    });

});