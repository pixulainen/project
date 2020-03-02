const apiCategoryUrl = 'https://opentdb.com/api_category.php';

const API = {
	getCategories: () => fetch(apiCategoryUrl).then((res) => res.json())
};

API.getCategories().then((data) => renderCategories(data.trivia_categories));
