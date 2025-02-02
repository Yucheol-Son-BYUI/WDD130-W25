const reviews = [
	{
		id: 1,
		title: 'Septimus Heap Book One: Magyk',
		date: 'July 5, 2022',
		description:
			'If you enjoy stories about seventh sons of seventh sons and magyk this is the book for you.',
		imgSrc: 'https://upload.wikimedia.org/wikipedia/en/5/5f/Magkycover2.jpg',
		imgAlt: 'Book cover for Septimus Heap 1',
		ages: '10-14',
		genre: 'Fantasy',
		stars: '****'
	},
	{
		id: 2,
		title: 'Magnus Chase Book One: Sword of Summer',
		date: 'December 12, 2021',
		description:
			'The anticipated new novel by Rick Riordan. After Greek mythology (Percy Jackson), Greek/Roman (Heroes of Olympus), and Egyptian (Kane Chronicles), Rick decides to try his hand with Norse Mythology, and the end result is good.',
		imgSrc:
			'https://books.google.com/books/content/images/frontcover/xWuyBAAAQBAJ?fife=w300',
		imgAlt: 'Book cover for Magnus Chase 1',
		ages: '12-16',
		genre: 'Fantasy',
		stars: '⭐⭐⭐⭐'
	}
]


function reviewTemplate(review){
	let result = `<article class="review-card">
	<figure class="book-info">
	<img
	src="${review.imgSrc}"
	alt="${review.imgAlt}"
	/>
	<ul class="book-metadata">
	<li class="book-title">${review.title}</li>
	<li class="rating">${review.stars}</li>
	<li>Age <span class="value">: ${review.ages}</span></li>
	<li>Genre <span class="value">: ${review.genre}</span></li>
	<li>Date <span class="value">: ${review.date}</span></li>
	</ul>
	</figure>
	<article class="book-review">
	<p>
	${review.description}
	<a href="#">Read More...</a>
	</p>
	</article>
	</article>`; 
	return result;
}

function addReviewCard(reviewCard_HTML){
	const reviewContainer_SEC = document.querySelector("#reviewContainer")
	reviewContainer_SEC.innerHTML += reviewCard_HTML
}

reviews.map(review => addReviewCard(reviewTemplate(review)))