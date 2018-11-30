const argv = require('yargs').argv
//const process=require ('process');
const fs=require ('fs');

let noteslist=JSON.parse(fs.readFileSync('Notes.json')); 
let title=body=''; let found=false;
const findtitle=()=>(title=argv.title);
const findbody=()=>(body=argv.body);

   const add=()=>{
     findbody();findtitle();
     noteslist.filter((el)=>{
      if(el.title==title){found=true;
      }
   });    console.log(found)
     if (title!=''&&title.length>0&&body!=''&&body.length>0&&found==false){
      let note='{"title":"'+ title+'","body":"'+body+'"}';
      noteslist.push(JSON.parse(note)); console.log(noteslist)
     fs.writeFileSync('Notes.json', JSON.stringify(noteslist) );
     console.log("Note added\n--\ntitle: "+title+"\nbody: "+body)
    }
    else if(title==''||body==''||(title==''&&body=='')){
      console.log('One or both arguments are missing: you should pass --title and --body to add a note')
    }
    else console.log('Note already exists')
   }

   const noteremove=()=>{
     findtitle();
     if (title!=''&&title.length>0){
        noteslist=noteslist.filter((el)=>(el.title!=title));
        fs.writeFileSync('Notes.json', JSON.stringify(noteslist) );
        
        console.log('Note deleted')
     }
     else console.log('Missing argument --title')
   }

   const listOne=()=>{
    findtitle();
    if (title!=''&&title.length>0){
       noteslist=noteslist.filter((el)=>{
         if(el.title==title){
          let titlefile=el.title; let bodyfile=el.body;
          console.log('--\ntitle:'+titlefile+'\nbody:'+bodyfile+'\n')
         }
      });
    }
    else console.log('Missing argument --title')
  }

const list=()=>{
  if(noteslist.length>0){
     console.log('Printing '+(noteslist.length)+' note(s)\n');
     noteslist.map((el)=>{  
       let titlefile=el.title; let bodyfile=el.body;
       console.log('--\ntitle:'+titlefile+'\nbody:'+bodyfile+'\n')
     })
   }
 }

 const init=()=>{
  var task=argv._[0];
  switch (task) {
    case 'add': add(); break;
    case 'remove':noteremove(); break;
    case 'list': list(); break;
    case 'listOne': listOne(); break;
    default:
      console.log('No action specified: add --title title --body body to add a note\n remove --title to remove a note\n list to list all notes.');
  }
}
/*
 console.log(argv._[0]);
 console.log(argv.title);
 console.log(argv.body);
*/
init();