const categoryMenuEl = document.getElementById('category_menu');

const renderCategories = (categories) => categories.forEach((category) => renderCategory(category));

renderCategory = (category) => {
	const categoryDivEl = document.createElement('div');
	categoryDivEl.className = 'item';
	categoryDivEl.id = category.id;
	categoryDivEl.innerText = category.name;
	categoryMenuEl.append(categoryDivEl);
};
