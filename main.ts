let mgst = 0
let lmb = ""
let bs = 0
let msg = ""
let dit = 0
// Empfangen
radio.onDataPacketReceived( ({ receivedString }) =>  {
    // Buchstabenende
    if (receivedString == "b") {
        basic.showString(lmb.charAt(bs))
        bs = 1
    } else if (receivedString == "w") {
    	
    } else if (receivedString == "-") {
        // neue Spalte im Baum
        bs = 2 * bs
        // 1 addieren
        bs += 1
    } else if (receivedString == ".") {
        // neue Zeile im Baum
        bs = 2 * bs
    }
})
radio.setGroup(5)
// Dauer eines dit
dit = 150
// Buchstabenposition im linearisierten Binärbaum
bs = 1
// Linearisierter Morsecode Binärbaum
lmb = "''ETIANMSURWDKGOHVFüLAPJBXCYZQÖ'54'3'''2''+''''16=/'''''7'''8'90"
// Senden
basic.forever(() => {
    if (input.pinIsPressed(TouchPin.P0) || input.buttonIsPressed(Button.A)) {
        // dit
        msg = "."
        radio.sendString(msg)
        basic.showString(msg)
        music.playTone(262, 1 * dit)
        mgst = input.runningTime()
        music.rest(dit)
    }
    if (input.pinIsPressed(TouchPin.P3) || input.buttonIsPressed(Button.B)) {
        // dah
        msg = "-"
        radio.sendString(msg)
        basic.showString(msg)
        music.playTone(262, 3 * dit)
        mgst = input.runningTime()
        music.rest(dit)
    }
    // nur einmal senden
    if (msg != "w") {
        // nur einmal senden
        if (msg != "b") {
            if (input.runningTime() - mgst >= 3 * dit) {
                // neuer Buchstabe (3*dit Pause)
                msg = "b"
                radio.sendString(msg)
                basic.showString(msg)
            }
        }
        if (input.runningTime() - mgst >= 7 * dit) {
            // neues Wort (7*dit Pause)
            msg = "w"
            radio.sendString(msg)
            basic.showString(msg)
        }
    }
})