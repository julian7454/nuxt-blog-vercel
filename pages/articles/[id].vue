<template>
    <div class="flex w-full justify-center px-6 lg:px-0">
        <div v-if="status.value === 'pending'">
            <Icon class="h-6 w-6 text-gray-500" name="eos-icons:loading" />
        </div>
        <template v-else>
            <div v-if="error" class="my-4">
                <span class="text-gray-500">發生了一點錯誤，請稍後再嘗試</span>
                <p class="my-2 text-rose-500">{{ error }}</p>
            </div>
            <div v-else-if="article" class="mb-8 flex w-full flex-col justify-center md:max-w-3xl">
                <div class="mt-4 flex justify-center">
                    <img :src="article.cover" />
                </div>
                <div class="my-2 flex flex-col justify-between sm:my-0 sm:flex-row sm:items-center">
                    <time class="my-2 text-sm text-gray-400">
                        {{ new Date(article.updated_at).toLocaleString() }}
                    </time>
                    <div v-if="userInfo?.id === 1" class="flex-rowx flex gap-3">
                        <NuxtLink
                            class="flex items-center text-sm text-gray-400 hover:font-semibold hover:text-emerald-500"
                            :to="{
                                name: 'articles-edit',
                                query: {
                                    id: route.params.id
                                }
                            }">
                            <Icon class="mr-1 h-4 w-4" name="ri:edit-line" />
                            編輯
                        </NuxtLink>
                        <button class="flex items-center text-sm text-gray-400 hover:font-semibold hover:text-rose-500"
                            @click="handleDeleteArticle">
                            <Icon class="mr-1 h-4 w-4" name="ri:delete-bin-line" />
                            刪除
                        </button>
                    </div>
                </div>
                <h1 class="break-words text-4xl font-semibold text-gray-700">{{ article.title }}</h1>
                <div class="mt-6 break-words">
                    {{ article.content }}
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
const route = useRoute()

const { status, data: article, error } = await useFetch(`/api/articles/${route.params.id}`)

const userInfo = useState('userInfo')

const handleDeleteArticle = () => {
    const answer = confirm('你確定要刪除文章嗎？')

    if (answer) {
        $fetch(`/api/articles/${route.params.id}`, {
            method: 'DELETE'
        })
            .then(() => {
                navigateTo('/')
            })
            .catch((error) => {
                console.error(error)
                alert(error)
            })
    }
}
</script>