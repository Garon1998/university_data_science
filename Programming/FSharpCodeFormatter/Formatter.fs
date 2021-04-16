module FSharpCodeFormatter.Formatter

open Lib
open System.Security.Cryptography.X509Certificates

// se non vuoi realizzare la versione avanzata, non modificarla
let split (w : int) (s : string) = split_lines s

//divide una stringa (riga) in lista di stringhe (parole) e restituisce la prima 
let word_at_0 l = 
    match (tokenize_line l) with
    |[] -> "" //caso per riga vuota
    |x::xs -> x

//divide una stringa (riga) in lista di stringhe (parole) e restituisce l'ultima
let last_word l =
    let rec aux l1 = //funzione ausiliaria
        match l1 with
        |[] -> ""
        |[x]-> x
        |x::xs -> aux xs
    in aux (tokenize_line l)

//restituisce il nome presente dopo un "let" o un "let rec"
let rec let_name (s:string) = 
     let rec aux l = 
        match l with
        |[] -> ""
        |x::xs -> if x <> "let" && x <> "rec" then x
                  else aux xs
     in aux (tokenize_line s)

//restituisce il nome del in corrispondente all'ultimo let a cui si riferisce
let rec in_name let_list phrase = 
    match let_list with
    |[] -> ""
    |(_,z)::xs -> let rec aux_in_name list =   
                      match list with 
                      |[] -> in_name xs phrase
                      |y::ys -> if y = z then z
                                else aux_in_name ys
                  in aux_in_name phrase
       

//restituisce il primo elemento di una coppia
let first_elem c = match c with
                   |[] -> 0
                   |(y,_)::_ -> y

//restituisce la coda di una lista
let tail_list l =
    match l with 
    |[]->[]
    |_::xs -> xs

//data una lista l rimuove l'elemento in posizione n
let rec remove n l =
    match l with 
    |[]->[]
    |x::xs -> if n>0 then x::(remove (n-1) xs)
              else xs

///Funzione che data in input una lista di stringhe la restituice con il numero di tabulazioni per ogni singola riga
let rec indent (lines : string list) =
    let rec aux_indent lines ntab let_list if_list= //lines:righe di codice - ntab:livello di tabulazione corrente - let_list:contiene coppie formate da (livelloTabulazione,nomeLet) e serve per tenere uno storico dei let per l'indentazione degli in - if_list: lista di interi che tiene traccia del livello di indentazione degli if per indentare elif ed else 
        match lines with
        | [] -> [] //caso base di lista vuota (finite le righe da controllare)
        | x::xs -> match (word_at_0 x) with //confronto la prima parola della riga con i casi seguenti (parole chiave di F#)
                   | "" -> (0,x) :: aux_indent xs 0 [] [] //nessuna parola, riga vuota, torno a 0 con i Tab
                   | "in" -> let rec aux lista_let temp cont= //funzione che controlla il nome dopo il let/let rec con il nome dopo l'in
                                match lista_let with //controllo la let_list
                                |[] -> (temp,x)::(aux_indent xs (ntab-1) (tail_list let_list) if_list) //se la lista è vuota, rimane nella tabulazione corrente
                                |(n,m)::ys-> if (last_word x) = "in" then (temp,x)::(aux_indent xs (ntab) (tail_list let_list) if_list)
                                             elif n>0 && m = (in_name let_list (tokenize_line x)) then (n,x)::(aux_indent xs (n-1) (remove cont let_list) if_list) //i due nomi sono uguali e il let non si trova al top level, quindi indento l'in rispetto al let corrispondente e la riga dopo alla tabulazione corrente -1
                                             else aux ys temp (cont+1) //continuo a cercare nella let_list per trovare il let corrispondente all'in corrente per poi rimuoverlo dalla lista successivamente
                             in aux let_list (first_elem let_list) 0
                   | "let" -> if (last_word x = "=") then (ntab,x) :: aux_indent xs (ntab+1) ((ntab, (let_name x))::let_list) if_list //l'ultima parola è un "=" e quindi è presente un costrutto alla riga/e successive che va indentato ad un livello maggiore (ntab+1)
                              else (ntab,x) :: aux_indent xs (ntab) ((ntab, (let_name x))::let_list) if_list //tutto il "let" è su una riga, quindi la riga successiva andrà indentata allo stesso livello (ntab)
                   | "if" -> if (last_word x= "then") then (ntab,x) :: aux_indent xs (ntab+1) let_list (ntab::if_list) //l'ultima parola è un "then", ciò significa che è presente un costrutto alla riga/righe successiva/e (ntab+1)
                             else (ntab,x) :: aux_indent xs (ntab) let_list (ntab::if_list)//tutto l'if è su una riga, quindi la prossima riga sarà indentata ad ntab
                   | "elif" -> match if_list with //controllo la if_list
                               |[] -> failwith "Errore di sintassi" //nessun if precedente, errore di sintassi
                               |y::_ ->if (last_word x= "then") then (y,x) :: aux_indent xs (y+1) let_list if_list //l'ultima parola è un "then", ciò significa che è presente un costrutto alla riga/righe successiva/e (y+1) (y=tab dell'if corrente)
                                        else (y,x) :: aux_indent xs y let_list if_list //tutto l'elif è su una riga, quindi la prossima riga sarà indentata ad y (tab dell'if corrente)
                   | "else" -> match if_list with //controllo la if_list
                               |[] -> failwith "Errore di sintassi" //Nessun if precedente, errore di sintassi
                               |y::ys -> if (last_word x= "else") then (y,x) :: aux_indent xs (y+1) let_list ys //l'ultima parola è un "else", le righe successive contengono un costrutto (y+1)
                                         else (y,x) :: aux_indent xs (y-1) let_list ys //tutto l'else sta in una riga, se ci sono righe successive andranno indentate ad (y-1)
                   | "match" -> (ntab,x) :: aux_indent xs (ntab-1) let_list if_list //match, indento a ntab-1 per poter indentare correttamente le righe che iniziano con "|" e i costrutti dopo il match
                   | "|" -> if (last_word x = "->") then (ntab+1,x) :: aux_indent xs (ntab+2) let_list if_list //la riga inizia con "|" e lo indento al match corrente (ntab+1) e l'ultima parola è "->", quindi le righe successive verranno indentate ad (ntab+2)
                            else (ntab+1,x) :: aux_indent xs (ntab) let_list if_list //l'espressione è tutta su una riga, quindi quelle successive andranno indentate di un livello inferiore che in questo caso è ntab
                   | "fun" -> if (last_word x) = "->" then (ntab,x) :: aux_indent xs (ntab+1) let_list if_list //l'ultima parola è "->", quindi le righe successive verranno indentate ad (ntab+1)
                              else (ntab,x) :: aux_indent xs (ntab) let_list if_list //l'espressione è tutta su una riga, quindi quelle successive andranno indentate ad (ntab)
                   | _ -> ((ntab),x) :: aux_indent xs (ntab-1) let_list if_list //l'espressione andrà ad ntab e la successiva ad ntab-1
    in aux_indent lines 0 [] []