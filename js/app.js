// button click 
const searchBook = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // Clear data
    searchField.value = '';
    
    if(searchText === ''){
        const error = document.getElementById('empty-mgs');
        error.innerHTML=`
        <h4 class=" text-danger">Please Enter a book Name before search!!!</h4>
        `
    }
    else{
        const emptyClean = document.getElementById('empty-mgs');
        emptyClean.textContent='';
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => searchResult(data.docs))
    
    };  
   // clean previous result and massage 

    const cleanPastResult =document.getElementById('book-container');
    cleanPastResult.textContent = '';
    const error = document.getElementById('error-mgs');
    error.textContent = '';
    document.getElementById('search-found').textContent='';
};

// search output and append/
const searchResult = result=>{
    if(result.length === 0){
        const error = document.getElementById('error-mgs');
        error.innerHTML=`
        <h4 class="text-center text-danger">Search A Valid Name!!</h4>
        `;
    }
    else{
        const containerDiv = document.getElementById('book-container');
        let numberOfResult = 0;
        result.forEach(book =>{
            numberOfResult = numberOfResult+1;
        const bookCard = document.createElement('div')
        bookCard.classList.add('col')

        bookCard.innerHTML =`
        <div  class="card h-100 text-center">
    
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"  class="w-50 h-50 mx-auto" alt="No image..">
            <div class="card-body">
                <h5 class="card-title">Title: ${book.title}</h5>
                <ul class="list-group list-group-flush">
                <li class="list-group-item"><b>Author:</b>${book.author_name}</li>
                <li class="list-group-item"> <b>First Publish:</b>${book.first_publish_year}</li>
                <li class="list-group-item"><b>Publisher:</b>${book.publisher}</li>
                
              </ul>
                
            </div>
           
        </div>
        `;
        containerDiv.appendChild(bookCard);
    });
        const totalResult =document.getElementById('search-found');
        totalResult.innerHTML=`
        <h2 class="text-warning text-center" >There are ${numberOfResult} results found for you.</h2>
        `;
    };
    
};