const Discord = require('discord.js');
const client = new Discord.Client();
const firebase = require('firebase');
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});
let request = new XMLHttpRequest();
request.open('GET', 'https://cloud.cloudheberg.ga', false)
request.send();
return request.response.tim
var firebaseConfig = {
    apiKey: "AIzaSyCT3bScr1_lysml7Q9ErbNrZNEDsOoXEiw",
    authDomain: "cloud-heberg.firebaseapp.com",
    projectId: "cloud-heberg",
    storageBucket: "cloud-heberg.appspot.com",
    messagingSenderId: "104634443680",
    appId: "1:104634443680:web:105a0393af6b7a829b26c5",
    measurementId: "G-MJRYS115LK"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore();
  const db = firebase.firestore();
  client.on('message', msg => {
      db.collection('users').doc(msg.author.id).get().then((doc) => {
        if (doc.exists) {
            db.collection('users').doc(doc.id).update({
                points: firebase.firestore.FieldValue.increment(1)
            })
        } else {
            // doc.data() will be undefined in this case
            db.collection('users').doc(msg.author.id).set({
                points: firebase.firestore.FieldValue.increment(1)
            })
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    if(msg.content.startsWith('+solde')){
        let mention = msg.mentions.members.first();
        if(mention === undefined){
            mention = msg.author.id;
        } else {
            db.collection('users').doc(mention).get().then((doc) => {
            if (doc.exists) {
                const embed = new Discord.MessageEmbed()
                .setColor('#00ff00')
                .setTitle('Vos Points')
                .setDescription('Vous possédez actuellement : ' + doc.data().points + ' points')
                msg.channel.send(embed);
            } else {
               msg.channel.send('utilisateur introuvable');
            }}
        
        )}
        if(msg.content.startsWith("+addpoints")){
            let args = msg.content.split(" ");
           if(msg.member.hasPermission('ADMINISTRATOR')){
               db.collection('users').doc(mention.id).update({
               points: args[2]
               })
               .then(() => {
                  const embed = new Discord.MessageEmbed()
                  .setTitle(`Opération Réussie :white_check_mark:`)
                  .setColor(0x00FF00)
              .setDescription(`Le montant a été ajouté avec succès !`)
                   msg.channel.send(embed);
                   if(mention === undefined){
                       msg.channel.send("vous n'avez mentionné personne");
                   }
               })
           }
        }
        
    }})
        client.login('ODU5MDY2MjA2MDkzODM2Mjkw.YNnRwA.UF5bdY8izcX0CsWETYanGUBRxrI');
