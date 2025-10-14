var currentCode = "----";
var currentDifficulty = "";
var currentCharNum  = -1;
var ripensamento = false;
var goToEnding = false;
document.getElementById('currentCode').innerHTML = currentCode;
disableCharacters();
loadTest();

var phases = [
    "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9",
    "B1", "B2", "B3",
    "C1"
];
var currentPhase = 0;

var solutionCode = [
    "GRAUE",
    "NVAGM",
    "SAMSA",
    "CAFCA",
    "KLAMM",
    "CNWZV",
    "YITZL",
    "ROMEO",
    "IMLOK",
];
var solutionConformity = [
    "C",
    "N",
    "N",
    "C",
    "X",
    "N",
    "N",
    "C",
    "C",
];
var inserted =  [
    false, false, false, false, false, false, false, false, false
    ];

var charButtonNames = [
    "giornalista1",
    "guardia2",
    "agente3",
    "manager4",
    "attore5",
    "infermiera6",
    "religioso7",
    "spia8",
    "oste9",
];

var charNames = [
  "FOTOREPORTER",
    "GUARDIA DI CONFINE",
    "AGENTE DI COMMERCIO",
    "MANAGER MUSICALE",
    "ATTORE",
    "INFERMIERA",
    "RELIGIOSO",
    "SPIA",
    "OSTE"
];

var charImage = [
  "fotoreporter.jpg" ,
    "Guardia di confine.jpg",
    "agentedicommercio.jpg",
    "Manager.jpg",
    "attore.jpg",
    "infermiera.jpg",
    "religioso.jpg",
    "spia.jpg",
    "oste.jpg"
];

var charVideoUrl = [
    "https://www.youtube.com/embed/DJViBHp1tMQ",
    "https://www.youtube.com/embed/wBjbCBTED34",
    "https://www.youtube.com/embed/W854_Y5Ix1c",
    "https://www.youtube.com/embed/enpOAgOvA2o",
    "", //attore
    "https://www.youtube.com/embed/r0oKp2Mp3n0",
    "https://www.youtube.com/embed/jBaLuxi9OcI",
    "https://www.youtube.com/embed/ISqWxE7Mebc",
    "https://www.youtube.com/embed/-RDNWHfQY_g",
];

var charVideoUrlRipensamentoC = "https://www.youtube.com/embed/X8pPjno8tP4";
var charVideoUrlRipensamentoN = "https://www.youtube.com/embed/3G9QN5X41Gc";

var endingConforme = "https://www.youtube.com/embed/kPBVvj7ygvs";
var endingConformeB = "https://www.youtube.com/embed/x5pXGvQyVZU";
var endingNonconforme = "https://www.youtube.com/embed/2jDe5kFhhok";
var endingTilt = "https://www.youtube.com/embed/cNzAv4mZl5Y";

var helpText = [
"Quei segni neri sulle foto non servono certo a nascondere dei visi",
"Riparti sempre dal centro dello schema",
"La fotoreporter è stata a tutte le partite della Dynamo Schloss di questo mese?",
"Confronta i cartellini dei turni con la deposizione della guardia",
"Calendario alla mano, in che giorno e a che ora era di turno la guardia?",
"La guardia ha seguito passo per passo la procedura prevista dalle regole di ingaggio?",
"Fai attenzione ai campioni di tessuto e al Fascicolo N. 0",
"La rivista \"Periodico\" parla di \"proposte per tutte le ore\"...",
"Guarda la mappa: dove è stata l'agente di commercio in questo giorno?",
"Il manager sembra particolarmente entusiasta delle cinque note di \"Westwest\"",
"Una locandina può farti leggere la musica",
"Uno dei brani dei Metamorphosis è particolare: quale ascolteresti?",
"Personaggi e interpreti",
"Non hai notato una certa somiglianza?",
"Come interpreterai questa ultima Regola?",
"Per fare una pianta, ci vuole prima di tutto un seme",
"La lezione è su cinque anelli distinti della catena alimentare",
"Tutti i dettagli della pagina sono conformi alle Regole dello Stato, anche la più assurda?",
"Il colloquio è disturbato da un insetto",
"Non è un caso che lo Schloss abbia un Dipartimento di Entomomanzia",
"La scatola rispetta tutti i Provvedimenti attuativi dall'inizio alla fine?",
"Alcune diapositive sembrano riportare dettagli delle cartoline",
"Per la spia \"quello che vale di più viene sempre prima\", anche un francobollo",
"Combina i timbri per svelare la frase nascosta, una parola per ogni cartolina: la spia sta facendo il doppio gioco?",
"Come dice l'oste, la gradazione è importante",
"A volte quello che manca conta più di quello che c’è. Il prototipo dell'etichetta è un'ottima base per riconoscerlo...",
"Trova \"il solito posto\" in cui è stata l'oste: quali emanazioni olfattive lo identificano?",
];    

var charData = [];
initializeCharData();


function loadCode()
{
    // resetALL
    for (i = 0; i < 9; i++) {
        document.getElementById(charButtonNames[i]).classList.remove("conforme");
        document.getElementById(charButtonNames[i]).classList.remove("conformeverificato");
        document.getElementById(charButtonNames[i]).classList.remove("nonconforme");
        document.getElementById(charButtonNames[i]).classList.remove("nonconformeverificato");
        
        charData[i].code = "";
        charData[i].conformity = "";
        disableBtn(charButtonNames[i]);
    }
    document.getElementById("alpha").classList.remove("wiwconfirmed");
    document.getElementById("beta").classList.remove("wiwconfirmed");
    document.getElementById("gamma").classList.remove("wiwconfirmed");
    enableBtn("alpha");
    enableBtn("beta");
    enableBtn("gamma");
    currentPhase = 0;
    currentDifficulty = "";
    solutionConformity[2] = "N";
    document.getElementById("wiwverifica").innerHTML = "VERIFICA";
    disableBtn("wiwverifica"); 
    goToEnding = false;
    
    if(currentCode == "1961")
    {
        return true;
    }
    if(currentCode == "8472")
    {
        setDifficulty("alpha");
        return true;
    }
    if(currentCode == "1884")
    {
        setDifficulty("beta");
        return true;
    }
    if(currentCode == "7853")
    {
        setDifficulty("gamma");
        return true;
    }
    if(currentCode == "3946")
    {
        setDifficulty("alpha");
        currentPhase = 1;
        enableCharacters();
        solveChar(1);
        return true;
    }
    if(currentCode == "4821")
    {
        setDifficulty("alpha");
        currentPhase = 2;
        enableCharacters();
        solveChar(1); solveChar(2);
        return true;
    }
    if(currentCode == "7644")
    {
        setDifficulty("alpha");
        currentPhase = 3;
        enableCharacters();
        solveChar(1); solveChar(2); solveChar(3);
        return true;
    }
    if(currentCode == "3817")
    {
        setDifficulty("alpha");
        currentPhase = 4;
        enableCharacters();
        solveChar(1); solveChar(2); solveChar(3); solveChar(8);
        return true;
    }
    if(currentCode == "9032")
    {
        setDifficulty("alpha");
        currentPhase = 5;
        enableCharacters();
        solveChar(1); solveChar(2); solveChar(3); solveChar(8);
        solveChar(6);
        return true;
    }
    if(currentCode == "5747")
    {
        setDifficulty("alpha");
        currentPhase = 6;
        enableCharacters();
        solveChar(1); solveChar(3); solveChar(8);
        solveChar(6); solveChar(0);
        return true;
    }
    if(currentCode == "2145")
    {
        setDifficulty("alpha");
        currentPhase = 7;
        enableCharacters();
        solutionConformity[2] = "X";
        document.getElementById(charButtonNames[2]).classList.add("conformeverificato");
        solveChar(1); solveChar(2); solveChar(3); solveChar(8);
        solveChar(6); solveChar(0); solveChar(5);
        return true;
    }
    if(currentCode == "9411")
    {
        setDifficulty("alpha");
        currentPhase = 7;
        enableCharacters();
        solutionConformity[2] = "X";
        document.getElementById(charButtonNames[2]).classList.add("nonconformeverificato");
        solveChar(1); solveChar(2); solveChar(3); solveChar(8);
        solveChar(6); solveChar(0); solveChar(5);
        return true;
    }
    if(currentCode == "4992")
    {
        setDifficulty("alpha");
        currentPhase = 8;
        enableCharacters();
        solutionConformity[2] = "X";
        document.getElementById(charButtonNames[2]).classList.add("conformeverificato");
        solveChar(1); solveChar(2); solveChar(3); solveChar(8);
        solveChar(6); solveChar(0); solveChar(5); solveChar(7);
        return true;
    }
    if(currentCode == "1564")
    {
        setDifficulty("alpha");
        currentPhase = 8;
        enableCharacters();
        solutionConformity[2] = "X";
        document.getElementById(charButtonNames[2]).classList.add("nonconformeverificato");
        solveChar(1); solveChar(2); solveChar(3); solveChar(8);
        solveChar(6); solveChar(0); solveChar(5); solveChar(7);
        return true;
    }
    if(currentCode == "7124")
    {
        setDifficulty("beta");
        currentPhase = 10;
        enableCharacters();
        solveChar(1); solveChar(2); solveChar(3);
        return true;
    }
    if(currentCode == "6975")
    {
        setDifficulty("beta");
        currentPhase = 11;
        enableCharacters();
        solveChar(1); solveChar(2); solveChar(3);
        solveChar(8); solveChar(6); solveChar(0);
        return true;
    }
    if(currentCode == "6295")
    {
        setDifficulty("alpha");
        currentPhase = 9;
        enableCharacters();
        solutionConformity[2] = "C";
        document.getElementById(charButtonNames[2]).classList.add("conformeverificato");
        document.getElementById(charButtonNames[4]).classList.add("conforme");
        solveChar(1); solveChar(2); solveChar(3); solveChar(8);
        solveChar(6); solveChar(0); solveChar(5); solveChar(7); solveChar(4);
        document.getElementById("wiwverifica").innerHTML = "INVIA TEST";
        enableBtn("wiwverifica"); 
        goToEnding = true;
        return true;
    }
    if(currentCode == "1274")
    {
        setDifficulty("alpha");
        currentPhase = 9;
        enableCharacters();
        solutionConformity[2] = "N";
        document.getElementById(charButtonNames[2]).classList.add("nonconformeverificato");
        document.getElementById(charButtonNames[4]).classList.add("conforme");
        solveChar(1); solveChar(2); solveChar(3); solveChar(8);
        solveChar(6); solveChar(0); solveChar(5); solveChar(7); solveChar(4);
        document.getElementById("wiwverifica").innerHTML = "INVIA TEST";
        enableBtn("wiwverifica"); 
        goToEnding = true;
        return true;
    }
    if(currentCode == "9564")
    {
        setDifficulty("alpha");
        currentPhase = 9;
        enableCharacters();
        solutionConformity[2] = "C";
        document.getElementById(charButtonNames[2]).classList.add("conformeverificato");
        document.getElementById(charButtonNames[4]).classList.add("nonconforme");
        solveChar(1); solveChar(2); solveChar(3); solveChar(8);
        solveChar(6); solveChar(0); solveChar(5); solveChar(7); solveChar(4);
        document.getElementById("wiwverifica").innerHTML = "INVIA TEST";
        enableBtn("wiwverifica"); 
        goToEnding = true;
        return true;
    }
    if(currentCode == "5904")
    {
        setDifficulty("alpha");
        currentPhase = 9;
        enableCharacters();
        solutionConformity[2] = "N";
        document.getElementById(charButtonNames[2]).classList.add("nonconformeverificato");
        document.getElementById(charButtonNames[4]).classList.add("nonconforme");
        solveChar(1); solveChar(2); solveChar(3); solveChar(8);
        solveChar(6); solveChar(0); solveChar(5); solveChar(7); solveChar(4);
        document.getElementById("wiwverifica").innerHTML = "INVIA TEST";
        enableBtn("wiwverifica"); 
        goToEnding = true;
        return true;
    }
    if(currentCode == "4340")
    {
        setDifficulty("beta");
        currentPhase = 12;
        enableCharacters();
        solutionConformity[2] = "X";
        document.getElementById(charButtonNames[2]).classList.add("conformeverificato");
        document.getElementById(charButtonNames[4]).classList.add("conforme");
        solveChar(1); solveChar(2); solveChar(3); solveChar(8);
        solveChar(6); solveChar(0); solveChar(5); solveChar(7); solveChar(4);
        document.getElementById("wiwverifica").innerHTML = "INVIA TEST";
        enableBtn("wiwverifica"); 
        goToEnding = true;
        ripensamento = false;
        return true;
    }
    if(currentCode == "8591")
    {
        setDifficulty("beta");
        currentPhase = 12;
        enableCharacters();
        solutionConformity[2] = "X";
        document.getElementById(charButtonNames[2]).classList.add("nonconformeverificato");
        document.getElementById(charButtonNames[4]).classList.add("conforme");
        solveChar(1); solveChar(2); solveChar(3); solveChar(8);
        solveChar(6); solveChar(0); solveChar(5); solveChar(7); solveChar(4);
        document.getElementById("wiwverifica").innerHTML = "INVIA TEST";
        enableBtn("wiwverifica"); 
        goToEnding = true;
        ripensamento = false;
        return true;
    }
    if(currentCode == "4803")
    {
        setDifficulty("beta");
        currentPhase = 12;
        enableCharacters();
        solutionConformity[2] = "X";
        document.getElementById(charButtonNames[2]).classList.add("conformeverificato");
        document.getElementById(charButtonNames[4]).classList.add("nonconforme");
        solveChar(1); solveChar(2); solveChar(3); solveChar(8);
        solveChar(6); solveChar(0); solveChar(5); solveChar(7); solveChar(4);
        document.getElementById("wiwverifica").innerHTML = "INVIA TEST";
        enableBtn("wiwverifica"); 
        goToEnding = true;
        ripensamento = false;
        return true;
    }
    if(currentCode == "2063")
    {
        setDifficulty("beta");
        currentPhase = 12;
        enableCharacters();
        solutionConformity[2] = "X";
        document.getElementById(charButtonNames[2]).classList.add("nonconformeverificato");
        document.getElementById(charButtonNames[4]).classList.add("nonconforme");
        solveChar(1); solveChar(2); solveChar(3); solveChar(8);
        solveChar(6); solveChar(0); solveChar(5); solveChar(7); solveChar(4);
        document.getElementById("wiwverifica").innerHTML = "INVIA TEST";
        enableBtn("wiwverifica"); 
        goToEnding = true;
        ripensamento = false;
        return true;
    }
    if(currentCode == "5494")
    {
        setDifficulty("gamma");
        currentPhase = 13;
        enableCharacters();
        solutionConformity[2] = "X";
        document.getElementById(charButtonNames[2]).classList.add("conformeverificato");
        document.getElementById(charButtonNames[4]).classList.add("conforme");
        solveChar(1); solveChar(2); solveChar(3); solveChar(8);
        solveChar(6); solveChar(0); solveChar(5); solveChar(7); solveChar(4);
        document.getElementById("wiwverifica").innerHTML = "INVIA TEST";
        enableBtn("wiwverifica"); 
        goToEnding = true;
        ripensamento = false;
        return true;
    }
    if(currentCode == "1371")
    {
        setDifficulty("gamma");
        currentPhase = 13;
        enableCharacters();
        solutionConformity[2] = "X";
        document.getElementById(charButtonNames[2]).classList.add("nonconformeverificato");
        document.getElementById(charButtonNames[4]).classList.add("conforme");
        solveChar(1); solveChar(2); solveChar(3); solveChar(8);
        solveChar(6); solveChar(0); solveChar(5); solveChar(7); solveChar(4);
        document.getElementById("wiwverifica").innerHTML = "INVIA TEST";
        enableBtn("wiwverifica"); 
        goToEnding = true;
        ripensamento = false;
        return true;
    }
    if(currentCode == "0776")
    {
        setDifficulty("gamma");
        currentPhase = 13;
        enableCharacters();
        solutionConformity[2] = "X";
        document.getElementById(charButtonNames[2]).classList.add("conformeverificato");
        document.getElementById(charButtonNames[4]).classList.add("nonconforme");
        solveChar(1); solveChar(2); solveChar(3); solveChar(8);
        solveChar(6); solveChar(0); solveChar(5); solveChar(7); solveChar(4);
        document.getElementById("wiwverifica").innerHTML = "INVIA TEST";
        enableBtn("wiwverifica"); 
        goToEnding = true;
        ripensamento = false;
        return true;
    }
    if(currentCode == "3415")
    {
        setDifficulty("gamma");
        currentPhase = 13;
        enableCharacters();
        solutionConformity[2] = "X";
        document.getElementById(charButtonNames[2]).classList.add("nonconformeverificato");
        document.getElementById(charButtonNames[4]).classList.add("nonconforme");
        solveChar(1); solveChar(2); solveChar(3); solveChar(8);
        solveChar(6); solveChar(0); solveChar(5); solveChar(7); solveChar(4);
        document.getElementById("wiwverifica").innerHTML = "INVIA TEST";
        enableBtn("wiwverifica"); 
        goToEnding = true;
        ripensamento = false;
        return true;
    }
    return false;
}

function getCode()
{
    if(currentDifficulty == "alpha")
    {
        if(currentPhase == 0)
            return "8472";
        if(currentPhase == 1)
            return "3946";
        if(currentPhase == 2)
            return "4821";
        if(currentPhase == 3)
            return "7644";
        if(currentPhase == 4)
            return "3817";
        if(currentPhase == 5)
            return "9032";
        if(currentPhase == 6)
            return "5747";
        if(currentPhase == 7 && document.getElementById(charButtonNames[2]).classList.contains("conforme"))
            return "2145";
        if(currentPhase == 7 && document.getElementById(charButtonNames[2]).classList.contains("nonconforme"))
            return "9411";
        if(currentPhase == 8 && document.getElementById(charButtonNames[2]).classList.contains("conformeverificato"))
            return "4992";
        if(currentPhase == 8 && document.getElementById(charButtonNames[2]).classList.contains("nonconformeverificato"))
            return "1564";
        if(currentPhase == 9)
        {
            if(document.getElementById(charButtonNames[4]).classList.contains("conforme"))
            {
                if(document.getElementById(charButtonNames[2]).classList.contains("conformeverificato"))
                    return "6295";
                else
                    return "1274";
            }
            else 
            {
                if(document.getElementById(charButtonNames[2]).classList.contains("conformeverificato"))
                    return "9564";
                else
                    return "5904";
            }
        }
    }
    else if(currentDifficulty == "beta")
    {
        if(currentPhase == 9)
            return "1884";
        if(currentPhase == 10)
            return "7124";
        if(currentPhase == 11)
            return "6975";
        if(currentPhase == 12)
        {
            if(document.getElementById(charButtonNames[4]).classList.contains("conforme"))
            {
                if(document.getElementById(charButtonNames[2]).classList.contains("conformeverificato"))
                    return "4340";
                else
                    return "8591";
            }
            else 
            {
                if(document.getElementById(charButtonNames[2]).classList.contains("conformeverificato"))
                    return "4803";
                else
                    return "2063";
            }
        }
    }
    else if(currentDifficulty == "gamma")
    {
        if(currentPhase == 12)
            return "7853";
        if(currentPhase == 13)
        {
            if(document.getElementById(charButtonNames[4]).classList.contains("conforme"))
            {
                if(document.getElementById(charButtonNames[2]).classList.contains("conformeverificato"))
                    return "5494";
                else
                    return "1371";
            }
            else 
            {
                if(document.getElementById(charButtonNames[2]).classList.contains("conformeverificato"))
                    return "0776";
                else
                    return "3415";
            }
        }
    }
    return "----";
}

function solveChar(num)
{
    charData[num].code = solutionCode[num];
    charData[num].conformity = solutionConformity[num];
    if(solutionConformity[num] == "C")
        document.getElementById(charButtonNames[num]).classList.add("conformeverificato");
    else if(solutionConformity[num] == "N")
        document.getElementById(charButtonNames[num]).classList.add("nonconformeverificato");
    if(num != 4)
        enableBtn(charButtonNames[num]);
    else 
        disableBtn(charButtonNames[num]);
}

function initializeCharData()
{
    for (i = 0; i < 9; i++) {
      charData.push ( { code: "", conformity: ""} );
    }
    checkSendTest();
}
   
function openNav() {
  document.getElementById("menuNav").style.width = "100%";
}

function closeNav() {
  document.getElementById("menuNav").style.width = "0%";
}
    
function closeSplash() {
  var codeInput = document.getElementById("wiwcodeinput").value;
	
	currentCode = codeInput;
    if(loadCode())
	{
		document.getElementById("currentCode").innerHTML = currentCode;
		document.getElementById("splash").style.width = "0%";
		console.log(codeInput);
        if(ripensamento)
        {
            ripensamento = false;
            document.getElementById(charButtonNames[2]).classList.remove("nonconformeverificato");
            //document.getElementById(charButtonNames[2]).classList.remove("nonconforme");
            enableBtn("agente3");
            solutionConformity[2] = "X";
        }
        document.getElementById("idinesistente").classList.add("d-none");
	}
    else
        {
            document.getElementById("idinesistente").classList.remove("d-none");
        }
}

function onCodeInputClick()
{
    document.getElementById("idinesistente").classList.add("d-none");
}
    
function enableBtn(elementId)
{
	document.getElementById(elementId).disabled = false;
}	
function disableBtn(elementId)
{
	document.getElementById(elementId).disabled = true;
}

function setDifficultyClick(id)
{
    setDifficulty(id);
    document.getElementById("currentCode").innerHTML = getCode();
}

function setDifficulty(id)
{
    //$('#videoModal').modal('show');
    
    if(currentDifficulty == "")
    {
        currentDifficulty = id;
        if(id == "alpha")
        {
            document.getElementById(id).classList.add("wiwconfirmed");
            disableBtn("beta");
            disableBtn("gamma");
            currentPhase = 0;
            enableCharacters();
        }
        else if(id == "beta")
        {
            document.getElementById(id).classList.add("wiwconfirmed");
            disableBtn("alpha");
            disableBtn("gamma");
            currentPhase = 9;
            enableCharacters();
        }
        else if(id == "gamma")
        {
            document.getElementById(id).classList.add("wiwconfirmed");
            disableBtn("beta");
            disableBtn("alpha");
            currentPhase = 12;
            enableCharacters();
        }
    }
}

function enableCharacters()
{
    disableCharacters();
    phase = phases[currentPhase];
    if(phase == "A1")
    {
        enableBtn("guardia2");
    }
    else if(phase == "A2")
    {
        enableBtn("agente3");
    }
    else if(phase == "A3")
    {
        enableBtn("manager4");
    }
    else if(phase == "A4")
    {
        enableBtn("oste9");
    }
    else if(phase == "A5")
    {
        enableBtn("religioso7");
    }
    else if(phase == "A6")
    {
        enableBtn("giornalista1");
    }
    else if(phase == "A7")
    {
        enableBtn("infermiera6");
        // ripensamento
        ripensamento = true;
    }
    else if(phase == "A8")
    {
        enableBtn("spia8");
    }
    else if(phase == "A9")
    {
        enableBtn("attore5");
    }
    else if(phase == "B1")
    {
        enableBtn("guardia2");
        enableBtn("agente3");
        enableBtn("manager4");
    }
    else if(phase == "B2")
    {
        enableBtn("oste9");
        enableBtn("religioso7");
        enableBtn("giornalista1");
    }
    else if(phase == "B3")
    {
        enableBtn("infermiera6");
        enableBtn("spia8");
        enableBtn("attore5");
        // ripensamento
        ripensamento = true;
    }
    else if(phase == "C1")
    {
        enableBtn("giornalista1");
        enableBtn("guardia2");
        enableBtn("agente3");
        //
        enableBtn("manager4");
        enableBtn("attore5");
        enableBtn("infermiera6");
        //
        enableBtn("religioso7");
        enableBtn("spia8");
        enableBtn("oste9");
        // ripensamento
        //ripensamento = true;
        solutionConformity[2] = "X";
    }
    checkSendTest();
}

function disableCharacters()
{
    disableBtn("giornalista1");
    disableBtn("guardia2");
    disableBtn("agente3");
        //
    disableBtn("manager4");
    disableBtn("attore5");
    disableBtn("infermiera6");
    //
    disableBtn("religioso7");
    disableBtn("spia8");
    disableBtn("oste9");
}

function showAiuto(button, num)
{
   document.getElementById("aiutoTesto").classList.remove("d-none");
    document.getElementById("aiutoTesto").innerHTML = helpText[currentCharNum*3 + num];
    button.classList.add("wiwconfirmed");
    
    if(button.id == "aiutoCodice1")
        enableBtn("aiutoCodice2");
}

function setConforme(button, val)
{
    document.getElementById("conformeBtn").classList.remove("wiwconfirmed");
    document.getElementById("nonconformeBtn").classList.remove("wiwconfirmed");
    button.classList.add("wiwconfirmed");
    checkInsertVaulues();
    if(val == true)
        charData[currentCharNum].conformity = "C";
    else
        charData[currentCharNum].conformity = "N";
}

function reset()
{

}

function loadTest()
{
    document.getElementById("splash").style.width = "100%";
    document.getElementById("menuNav").style.width = "0%";
}

function loadNewTest()
{
    document.getElementById("menuNav").style.width = "0%";
    currentCode = "1961";
    loadCode();
    document.getElementById("currentCode").innerHTML = currentCode;
}

function openHelpUrl()
{
    window.open("/help", '_blank');
}

function checkCodeInput()
{
    if(document.getElementById('codeInput').value.length == 5)
        document.getElementById("codeInput").classList.add("wiwconfirmed");
    else
        document.getElementById("codeInput").classList.remove("wiwconfirmed");
    checkInsertVaulues();
}

function checkInsertVaulues()
{
    if(document.getElementById('codeInput').value.length == 5
      && (document.getElementById("conformeBtn").classList.contains("wiwconfirmed") || document.getElementById("nonconformeBtn").classList.contains("wiwconfirmed")))
        {
       enableBtn("insertValues"); 
    }
    else 
        {
        disableBtn("insertValues");
    }
}

function insertValues()
{
    charData[currentCharNum].code = document.getElementById('codeInput').value;
    inserted[currentCharNum] = true;
    if(charData[currentCharNum].conformity == "C")
    {
        document.getElementById(charButtonNames[currentCharNum]).classList.add("conforme");
        document.getElementById(charButtonNames[currentCharNum]).classList.remove("nonconforme");
    }
    else
    {
        document.getElementById(charButtonNames[currentCharNum]).classList.add("nonconforme");
        document.getElementById(charButtonNames[currentCharNum]).classList.remove("conforme");
    }
        
    checkSendTest();
}

function checkSendTest()
{
    var enableTestBtn = false;
    var phase = phases[currentPhase];
    if(phase == "A1")
    {
        enableTestBtn = inserted[1]; 
    }
    else if(phase == "A2")
    {
        enableTestBtn = inserted[2];
    }
    else if(phase == "A3")
    {
        enableTestBtn = inserted[3];
    }
    else if(phase == "A4")
    {
        enableTestBtn = inserted[8];
    }
    else if(phase == "A5")
    {
        enableTestBtn = inserted[6];
    }
    else if(phase == "A6")
    {
        enableTestBtn = inserted[0];
    }
    else if(phase == "A7")
    {
        enableTestBtn = inserted[5];
    }
    else if(phase == "A8")
    {
        enableTestBtn = inserted[7];
    }
    else if(phase == "A9")
    {
        enableTestBtn = inserted[4];
    }
    else if(phase == "B1")
    {
        enableTestBtn = inserted[1] && inserted[2] && inserted[3];
    }
    else if(phase == "B2")
    {
        enableTestBtn = inserted[8] && inserted[6] && inserted[0];
    }
    else if(phase == "B3")
    {
        enableTestBtn = inserted[5] && inserted[7] && inserted[4];
    }
    else if(phase == "C1")
    {
        enableTestBtn = inserted[0] && inserted[1] && inserted[2] && inserted[3]
            && inserted[4] && inserted[5] && inserted[6] && inserted[7] && inserted[8];
    }
    //
    /*if(phase == "C1" || phase == "B3" || phase == "A9")
    {
        document.getElementById("wiwverifica").innerHTML = "INVIA TEST";
    }*/
    if(enableTestBtn)
    {
        enableBtn("wiwverifica"); 
    }
    else
    {
        disableBtn("wiwverifica");
    }
}

var codeErrors = 0;
var conformityErrors = 0;

function checkSolution(charNum)
{
    console.log("checkSolution "+charNum);
    var codeCorrect = charData[charNum].code.toUpperCase() == solutionCode[charNum];
    if(!codeCorrect)
        codeErrors += 1;
    var conformityCorrect = (solutionConformity[charNum] == "X"
        || charData[charNum].conformity == solutionConformity[charNum]);
    if(!conformityCorrect)
        conformityErrors += 1;
    return codeCorrect && conformityCorrect;
}

function sendTest()
{
    if(goToEnding)
    {
        if(document.getElementById(charButtonNames[4]).classList.contains("conforme"))
        {
            if(document.getElementById(charButtonNames[2]).classList.contains("conformeverificato"))
            {
                document.getElementById("videoiframe").src = endingConforme;
            }
            else
            {
                document.getElementById("videoiframe").src = endingConformeB;
            }
        }
        else if(document.getElementById(charButtonNames[2]).classList.contains("conformeverificato"))
            {
                document.getElementById("videoiframe").src = endingTilt;
            }
            else
            {
                document.getElementById("videoiframe").src = endingNonconforme;
            }
        $('#videoModal').modal('show');
        
        return;
    }
    
    codeErrors = 0;
    conformityErrors = 0;
    var correct = false;
    var phase = phases[currentPhase];
    if(phase == "A1")
    {
        correct = checkSolution(1);
    }
    else if(phase == "A2")
    {
        correct = checkSolution(2);
    }
    else if(phase == "A3")
    {
        correct = checkSolution(3);
    }
    else if(phase == "A4")
    {
        correct = checkSolution(8);
    }
    else if(phase == "A5")
    {
        correct = checkSolution(6);
    }
    else if(phase == "A6")
    {
        correct = checkSolution(0);
    }
    else if(phase == "A7")
    {
        correct = checkSolution(5);
    }
    else if(phase == "A8")
    {
        correct = checkSolution(7);
    }
    else if(phase == "A9")
    {
        correct = checkSolution(4);
    }
    else if(phase == "B1")
    {
        correct = checkSolution(1);
        correct &= checkSolution(2);
        correct &=  checkSolution(3);
    }
    else if(phase == "B2")
    {
        correct = checkSolution(8);
        correct &= checkSolution(6);
        correct &= checkSolution(0);
    }
    else if(phase == "B3")
    {
        correct = checkSolution(5)
        correct &= checkSolution(7);
        correct &= checkSolution(4);
    }
    else if(phase == "C1")
    {
        correct = checkSolution(0);
        correct &= checkSolution(1);
        correct &= checkSolution(2);
        correct &= checkSolution(3);
        correct &= checkSolution(4);
        correct &= checkSolution(5);
        correct &= checkSolution(6);
        correct &= checkSolution(7);
        correct &= checkSolution(8);
    }
    //
    if(correct)
    {
        // show modal correct 
        currentPhase++;
        currentCode = getCode();
        document.getElementById("newSaveCode").innerHTML = currentCode;
        document.getElementById('currentCode').innerHTML = currentCode;      
        $('#resultModal').modal('show');
    }
    else
    {
        document.getElementById("codeErrors").innerHTML = codeErrors;
        document.getElementById("conformityErrors").innerHTML = conformityErrors;
        // show modal error
        console.log("error!");
        $('#errorModal').modal('show');
    }
}

$('#resultModal').on('hidden.bs.modal', function (event) {
    
    enableCharacters();
    for (i = 0; i < charData.length; i++) 
    {
        if(i == 4)
            continue;
        
        if(charData[i].conformity == "C")
            {
                document.getElementById(charButtonNames[i]).classList.remove("conforme");
                document.getElementById(charButtonNames[i]).classList.add("conformeverificato");
                enableBtn(charButtonNames[i]);
            }
        else if(charData[i].conformity == "N")
            {
                document.getElementById(charButtonNames[i]).classList.remove("nonconforme");
                document.getElementById(charButtonNames[i]).classList.add("nonconformeverificato");
                enableBtn(charButtonNames[i]);
            }

    } 
    if(ripensamento)
    {
        ripensamento = false;
        document.getElementById(charButtonNames[2]).classList.remove("nonconformeverificato");
        //document.getElementById(charButtonNames[2]).classList.remove("nonconforme");
        enableBtn("agente3");
        solutionConformity[2] = "X";
    }

    if(currentPhase == 9 || currentPhase == 12 || currentPhase == 13)
    {
        //TODO finale video KLAMM
        document.getElementById("wiwverifica").innerHTML = "INVIA TEST";
        goToEnding = true;
        disableBtn(charButtonNames[4]);
        enableBtn("wiwverifica");
    }
})


$(document).ready(function(e){
    		$(".conformeBtn").click(function(){
				$(this).toggleClass("check");
                document.getElementById("nonconformeBtn").classList.remove("check");
			});
	});
$(document).ready(function(e){
    		$(".nonconformeBtn").click(function(){
				$(this).toggleClass("check");
                document.getElementById("conformeBtn").classList.remove("check");
			});
	});

function clickOnChar(charNum)
{
    currentCharNum = charNum;
    if (document.getElementById(charButtonNames[charNum]).classList.contains("conformeverificato") || document.getElementById(charButtonNames[charNum]).classList.contains("nonconformeverificato"))
    {
        if(charNum == 2 && solutionConformity[2] == "X")
        {
            if (document.getElementById(charButtonNames[charNum]).classList.contains("conformeverificato"))
                document.getElementById("videoiframe").src = charVideoUrlRipensamentoC;
            else
                document.getElementById("videoiframe").src = charVideoUrlRipensamentoN;
        }
        else 
        {
            document.getElementById("videoiframe").src = charVideoUrl[charNum];
        }
       $('#videoModal').modal('show');
    }
    else
        {
            $('#personaggioModal').modal('show');
        }

}


$('#personaggioModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  //currentCharNum = button.data('num');
  var recipient = charNames[currentCharNum];
  var modal = $(this)
  modal.find('.modalHeaderText').text(recipient)
  document.getElementById("modalImg").src = "assets\\img\\"+charImage[currentCharNum];
    
    document.getElementById('codeInput').value = charData[currentCharNum].code;
    document.getElementById("conformeBtn").classList.remove("wiwconfirmed");
    document.getElementById("nonconformeBtn").classList.remove("wiwconfirmed");
    document.getElementById("aiutoCodice1").classList.remove("wiwconfirmed");
    document.getElementById("aiutoCodice2").classList.remove("wiwconfirmed");
    document.getElementById("aiutoOrientamento").classList.remove("wiwconfirmed");
    document.getElementById('codeInput').disabled = false;
    enableBtn("aiutoCodice1");
    enableBtn("aiutoOrientamento");
    
    if((currentPhase == 6 || currentPhase == 11) && currentCharNum == 2 
       && (currentDifficulty == "alpha" || currentDifficulty == "beta"))
    {
        document.getElementById('codeInput').value = solutionCode[currentCharNum];
        document.getElementById('codeInput').disabled = true;
        disableBtn("aiutoCodice1");
        disableBtn("aiutoOrientamento");
    }
    
    if(charData[currentCharNum].conformity =="N")
        document.getElementById("nonconformeBtn").classList.add("wiwconfirmed");
    else if(charData[currentCharNum].conformity =="C")
        document.getElementById("conformeBtn").classList.add("wiwconfirmed");
    
    disableBtn("aiutoCodice2");
    
    checkCodeInput();
  //console.log(button.data('image'));
})

$('#personaggioModal').on('hidden.bs.modal', function (event) {
    document.getElementById("aiutoTesto").classList.add("d-none");
})

$('#videoModal').on('hidden.bs.modal', function (event) {
    var $if = $(event.delegateTarget).find('iframe');
    var src = $if.attr("src");
    $if.attr("src", '/empty.html');
    $if.attr("src", src);
})