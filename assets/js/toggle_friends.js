

// CHANGE :: create a class to toggle likes when a link is clicked, using AJAX
class MakeFriendship{
  constructor(toggleElement){
      this.toggler = toggleElement;
      this.toggleFriend();
  }


  toggleFriend(){
      $(this.toggler).click(function(e){
          e.preventDefault();
          let self = this;

          // this is a new way of writing ajax which you might've studied, it looks like the same as promises
          $.ajax({
              type: 'POST',
              url: $(self).attr('href'),
          })
          .done(function(data) {
            
              if (data.data.deleted == true){
                $(self).html('Add as friend')
                  
              }else{
                $(self).html('Remove')
              }


            //  $(self).attr('data-likes', likesCount);
            //  $(self).html(`${likesCount} Likes`);

          })
          .fail(function(errData) {
              console.log('error in completing the request');
          });
          

      });
  }
}

  
  