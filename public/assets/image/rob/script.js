//let buttonsContainerHtml = ""; Zastanowić się czy jestem w stanie przypisać on Click do poszczególnych opcji z listy jeśli w bazie mam [{option: "nazwa opcji"},{content: "To co ma się wyświetlić po naciśnieciu na nazwę opcji"}]
const getDb = async () => {
	const response = await fetch('/wsparcieGetDb')
	if(response.status !== 200)
	{
		throw new Error("Cannot accomplish GET request")
	}
	const data = await response.json()
	return data
}
getDb()
	.then(data => {
		document.querySelector('#db').innerHTML = ''
		console.log(data)
		let colTag = ''
		data.forEach((item, i) => { // for each list item - show it on screen
			let short_intro = item.intro.substr(0,180)
			$('#db').append(`<div class="list-group py-2" id = "a${i}"><a href="#a${i}" class="list-group-item list-group-item-action py-3"><div class="pb-2"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><p class="text-muted d-inline ms-3">Częstość zapytań</p></div><h5 class="mb-1">${item.content}</h5><p class="mb-1">${short_intro}...</p><small>Odpowiada: ${item.author}</small></a></div>`)
			$(`#a${i}`).on('click', (e) =>{ //add onClick to every listItem
				let listItem_0 = `<div class="list-group">
				<a href="#a${i}" class="list-group-item list-group-item-action py-3">
					<div class="pb-2">
						<i class="bi bi-star-fill"></i>
						<i class="bi bi-star-fill"></i>
						<i class="bi bi-star-fill"></i>
						<i class="bi bi-star-fill"></i>
						<i class="bi bi-star-fill"></i>
						<p class="text-muted d-inline ms-3">Częstość zapytań</p>
					</div>
					<h5 class="mb-1">${item.content}</h5>
					<p class="mb-1">${item.intro}</p>`
				let listItem1 = `<div class="btn-group d-flex justify-content-center py-2" role="group" aria-label="0 Questions">`
				item.options.forEach((itemInOptions, j) => { //add options
					listItem1 += `<button id = "b${j}" class = "btn btn-outline-secondary rounded mx-2">${itemInOptions.option}</button>`
					if(!(j%2) & j > 0 )  //add new btn-group after 4 buttons, close previous one
					{
						let aria_label_nr = j / 2
						listItem1 += `</div><div class="btn-group d-flex justify-content-center py-2" role="group" aria-label="${aria_label_nr} Questions">`
					}
				})
				listItem1 += '</div>' //close button group
				let listItem2 = `<p id = "QA_answer">Hello</p><small class = "d-block">Odpowiada: ${item.author}</small></a></div>` 
				e.currentTarget.innerHTML = listItem_0 + listItem1 + listItem2	//add all together
				item.options.forEach((itemInOptions, j) => { //add on Click after buttons exists in DOM
					document.querySelector(`#b${j}`).addEventListener('click', (e) => {
						document.querySelector('#QA_answer').innerHTML = ''
						console.log("Target", e.target)
					})
				})

			})
			/*$('#a'+i).click(function(){ //add on 'click' to every button - showing intro and options
				$('#answer').html(`<p>${item.intro}</p>`)
				//let listaBuffer = "";
				item.options.forEach((itemInOptions, j) => {
					$('#answer').append('<li id = "o'+ j + '">'+ itemInOptions.option +'</li>')
					$('#o'+j).click(()=>{ //add on 'click' to every item to our new created list
						$('#answer').html('<p>'+itemInOptions.content+'</p>')
					})
				});
			})*/
			
		});
	})
	.catch(err => console.log('Error is this: ', err))

	//document.querySelector('#db').innerHTML = ""
	//document.querySelector('#db').innerHTML = '<div class="row justify-content-center mt-4"><div class="col-lg-6"><div class="list-group"><a href="#" class="list-group-item list-group-item-action py-3"><div class="pb-2"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><p class="text-muted d-inline ms-3">Częstość zapytań</p></div><h5 class="mb-1">Raport miesięczny</h5><p class="mb-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere eos sit molestiae. Consectetur itaque blanditiis eum!</p><small>Odpowiada: Szymon</small></a></div></div><div class="col-lg-6"><div class="list-group"><a href="#" class="list-group-item list-group-item-action py-3 border-top"><div class="pb-2"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></div><h5 class="mb-1">Wirtualna drukarka VTPrn</h5><p class="mb-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere eos sit molestiae. Consectetur itaque blanditiis eum!</p><small>Odpowiada: Kuba</small></a></div></div></div>'

/*$.ajax({
	type: 'GET',
	url: '/wsparcieGetDb',
	data: {name: 'SzySzy'},
	success: function(dataFromServer){
		dataFromServer.forEach((item, i) => { // for each button - show it on screen
			console.log("done: " + i + " times.")
			$('#buttonsContainer').append('<button id = "a'+i+'">'+item.content+'</button>')
			$('#a'+i).click(function(){ //add on 'click' to every button - showing intro and options
				$('#answer').html('<p>' + item.intro + '</p>')
				//let listaBuffer = "";
				item.options.forEach((itemInOptions, j) => {
					$('#answer').append('<li id = "o'+ j + '">'+ itemInOptions.option +'</li>')
					$('#o'+j).click(()=>{ //add on 'click' to every item to our new created list
						$('#answer').html('<p>' + itemInOptions.content+'</p>')
					})
				});
			})
		});
	}
})


getDb()
	.then(data => {
		console.log(data)
		data.forEach((item, i) => { // for each button - show it on screen
			$('#buttonsContainer').append('<button id = "a'+i+'">'+item.content+'</button>')
			$('#a'+i).click(function(){ //add on 'click' to every button - showing intro and options
				$('#answer').html('<p>' + item.intro + '</p>')
				//let listaBuffer = "";
				item.options.forEach((itemInOptions, j) => {
					$('#answer').append('<li id = "o'+ j + '">'+ itemInOptions.option +'</li>')
					$('#o'+j).click(()=>{ //add on 'click' to every item to our new created list
						$('#answer').html('<p>'+itemInOptions.content+'</p>')
					})
				});
			})
		});
	})
	.catch(err => console.log('Error is this: ', err))*/

//let answerContentStart = '<h3>Nie wiesz jak działa kasa?</h3><p>Zobacz krótki film</p><a href = "https://youtu.be/35E1NgCbB7c"><img id ="videoTutorial" src ="/assets/image/tutwideo.png"/></a>';
//$('#answer').html(answerContentStart);
