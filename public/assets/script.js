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
		let lastClickedItem = ''
		let buttonClicked = false
		let hasBeenClicked2 = false
		data.forEach((item, i) => { //

//-------------------------------forEach-------------object-from-Database--------------------------

			let short_intro = item.intro.substr(0,180)
			let stars = '';
			for(let i = 1; i <= item.stars; i++) {
				stars += '<i class="bi bi-star-fill"></i>'
			}
			if(item.stars % 1){
				stars += '<i class="bi bi-star-half"></i>'
			}
			$('#db').append(
				`<div class="list-group py-2 postAnim myBg" id = "a${i}">
					<a class="list-group-item list-group-item-action py-3">
						<div class="pb-2">
							${stars}
						<p class="text-muted d-inline ms-3">Częstość zapytań</p>
					</div>
					<h5 class="mb-2 mb-md-1">${item.content}</h5>
					<p class="mb-1">${short_intro}...</p>
					</a>
					<small></b>Odpowiada: ${item.author}</small>
				</div>`)
			$(`#a${i}`).on('click', (e) =>{ //
//-----------------------------onClick-------------Question-details---------------------
				
				
				if(!e.currentTarget.getAttribute('hasbeenclicked')) {
			//-----------------hide---previously---clicked------------
				document.querySelectorAll('#db .list-group').forEach(answer => {
					if(answer.getAttribute('hasbeenclicked') && e.currentTarget.id !== answer.id){
						answer.removeAttribute('hasbeenclicked')
						console.log("IS open are:", answer)
				
						e.currentTarget.classList.add('preAnim')
						e.currentTarget.classList.remove('postAnim')
						answer.innerHTML = `
						<a class="list-group-item list-group-item-action py-3">
							<div class="pb-2">
								${stars}
								<p class="text-muted d-inline ms-3">Częstość zapytań</p>
							</div>
							<h5 class="mb-1">${data[answer.id.substring(1)].content}</h5>
							<p class="mb-1">${data[answer.id.substring(1)].intro.substr(0,180)}...</p>
						</a>
						<small></b>Odpowiada: ${data[answer.id.substring(1)].author}</small>`
						
						setTimeout(() => {
							e.currentTarget.classList.remove('preAnim')
							e.currentTarget.classList.add('postAnim')
						
						}, 100)
						
					}
			//-------------hide---previously---clicked------------ends
				})
					e.currentTarget.setAttribute('hasbeenclicked', null)
					e.currentTarget.classList.add('preAnim')
					e.currentTarget.classList.remove('postAnim')
					e.currentTarget.innerHTML = `
					<li class="list-group-item py-3">
						<div class="pb-2">
							${stars}
							<p class="text-muted d-inline ms-3">Częstość zapytań</p>
						</div>
						<h5 class="mb-1">${item.content}</h5>
						<p class="my-4 text-center">${item.intro}</p>`
						setTimeout(() => {
							e.currentTarget.classList.remove('preAnim')
							e.currentTarget.classList.add('postAnim')
						
						}, 100)
					item.options.forEach((itemInOptions, j) => { //

	//-------------------------add-buttons------options---from---database

						$(e.currentTarget).append(`<button type="button" id = "${e.currentTarget.id}_b_${j}" class = "list-group-item list-group-item-action text-center">${itemInOptions.option}</button>`)
						
	//------------------------onclick to every button------------------------------------------------------

						document.querySelector(`#${e.currentTarget.id}_b_${j}`).addEventListener('click', (eventButton) =>{
							e.currentTarget.classList.add('preAnim')
							e.currentTarget.classList.remove('postAnim')
							document.querySelector(`#${e.currentTarget.id}`).innerHTML = `
							<li class="list-group-item py-3 text-center">
								<h5 class="mb-4">${item.content}</h5>
								<p>${itemInOptions.content}</p>
								<button class ="btn btn-outline-secondary btn-sm" id = "goBack">powrót</button>
							</li>`
							setTimeout(() => {
								e.currentTarget.classList.remove('preAnim')
								e.currentTarget.classList.add('postAnim')
							
							}, 100)
							document.querySelector('#goBack').addEventListener('click', () => {
								e.currentTarget.removeAttribute('hasbeenclicked')
							})

						})
					})
				}
			})
					/*$(e.currentTarget).append(`<small class = "d-block">Odpowiada: ${item.author}</small></li>`)
			console.log('out')
			item.options.forEach((option, j) =>{
			
				document.querySelector(`#${e.currentTarget.id}_b_${j}`).addEventListener('click', () =>{console.log('in')})
			})*/
			
			
			
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
