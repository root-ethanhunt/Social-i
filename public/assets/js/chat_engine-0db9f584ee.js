class ChatEngine{constructor(e,s){this.chatBox=$("#"+e),this.userEmail=s,this.socket=io.connect("http://127.0.0.1:5000"),this.userEmail&&this.connectionHandler()}connectionHandler(){let e=this;this.socket.on("connect",(function(){console.log("connection established using sockets..."),e.socket.emit("join_room",{user_email:e.userEmail,chatroom:"sociali"}),e.socket.on("user_joined",(function(e){console.log("a user joined",e)}))})),$("#send-message").click((function(){let s=$("#chat-message-input").val();""!=s&&e.socket.emit("send_message",{message:s,user_email:e.userEmail,chatroom:"sociali"})})),e.socket.on("receive_message",(function(s){console.log("message received",s.message);let o=$("<li>"),t="other-message";s.user_email==e.userEmail&&(t="self-message"),o.append($("<span>",{html:s.message})),o.append($("<sub>",{html:s.user_email})),o.addClass(t),$("#chat-messages-list").append(o)}))}}