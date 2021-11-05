 var notes;
 var count = 0;

$(document).ready(function() {
    notes = $("#notes"); // get references to the 'notes' list

   // load notes from local storage if one's available
   var storedNotes = localStorage.getItem("notes");
  if (storedNotes)
   {
      // passes the stored json back into an array of note objects
        var notesArray = JSON.parse(storedNotes);
       count = notesArray.length;
      for (var i = 0; i < count; i++) {
           var storedNote = notesArray[i];
           addNewNote(storedNote.Class, storedNote.Title, storedNote.Content);
        }
    }

    

    // clicking the 'Save' button saves the state of the notes board to the local storage                
    $("#btnSave").click(function() {
      var notesArray = new Array();

        // for each of the notes add a bespoke note object to the array
        notes.find("li > div").each(function (i, e) {
            // save the class attribute of the div, as well as the text for the title and content text areas
            var colourClass = $(e).attr("class");
           var title = $(e).find("textarea.note-title");
           var content = $(e).find("textarea.note-content");

          notesArray.push({ Index: i, Title: title.val(), Content: content.val(), Class: colourClass });
       });

        // json encode it
      var jsonStr = JSON.stringify(notesArray);

        // and save the json string into local storage
     localStorage.setItem("notes", jsonStr);

       // info the user it's done
        alert("Notes saved");
  });

   // add a note to the list if there aren't any
  if (count == 0)
    {
       $("#btnNew").click();
    }
 });