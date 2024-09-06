// BLUEPRINT STRUCTURE DESIGN 


// call prompt - what pokemone do you want to search, takes in 1 paramter called ID
//      exit() if user input is exit
//      else,
//          lower case ID 
//          return ID
//          
// TRY{ 
//      assign VAR name = fetch prompt feeding in ID - takes in 1 parameter called search_id = ID
//      IF SUCCESS:
//          convert data to json and return VAR name
//          log success status
//          ASK what data user wants to see: user_query() - takes 3 paramters: "info to see", "yes or no 1", "yes or no 2"
//          IF info OK:
//              log success status
//              return json data on requested information 
//              Ask continue question 1 - same pokemon? (will take YoN1 as its argument)
//              IF YES:
//                  log continue status
//                  call user_query again (implement a timeout on prompt where on timeout, execute exit())
//              IF NO:
//                  ask continue question 2 - different pokemon? (will take YoN2 as its argument)
//                  IF YES:
//                      log continue status 
//                      call_prompt() --> set exit() timeout
//                  IF NO:
//                      log exit status
//                      exit()  
//
//      IF Fail:
// CATCH{
//          return error message
//          ask continue prompt?
//          IF YES:
//              log continue status 
//              call prompt()
//          IF NO:
//              log exit status
//              exit()