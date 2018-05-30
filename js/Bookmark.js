document.getElementById('my_form').addEventListener('submit', saveBookmark);

//Save bookmark
function saveBookmark(e) {
    //Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if ((!siteName) && (!siteUrl)) {
        alert('please fill in the form');
        return false;
    }
    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    //local storage test
    if (localStorage.getItem('bookmarks') === null) {

        var bookmarks = [];

        //add object to an array
        bookmarks.push(bookmark);

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    } else {
        // get values from the local storage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        bookmarks.push(bookmark)
            //Re-set back to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    }

    /* to clear fields of the form
        // document.getElementById('siteName').value = '';
        // document.getElementById('siteUrl').value = '';
        */
    document.getElementById('my_form').reset();

    //re-fetch bookmark
    fetchBookmark();

    //Prevent form from submitting
    e.preventDefault();
}

function deleteBookmark(url) {
    //get bookmark from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    var index = null;
    for (var i = 0; i < bookmarks.length; i++) {

        if (bookmarks[i].url == url) {
            index = i;
            bookmarks.splice(index, 1);
        }
    }

    //Re-set back to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //re-fetch bookmark
    fetchBookmark();
}


// to fetch bookmark

function fetchBookmark() {

    //get bookmark from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //get output Id
    var bookmarksResult = document.getElementById('bookmarksResult');

    //build the output
    bookmarksResult.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResult.innerHTML += '<div class="well">' +
            '<h2>' + name +
            '<a class="btn  btn-sm btn-default target="_top" href="' + url + '" style="margin-left:4px">Visit</a>' +
            '<a onClick ="deleteBookmark(\'' + url + '\' )" class="btn btn-md btn-danger href="#" style="margin-left:2px">Delete</a>' +
            '</h2>' +
            '</div>';
    }

}