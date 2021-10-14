const decoder = new TextDecoder();
const output = document.getElementById('output');

const writeOutput = (msg) =>{
    return new Promise(resolve => {
        output.innerText = msg;
    });
}

const start = async () => {
    
    const device = await navigator.bluetooth.requestDevice({
        filters: [
            { namePrefix: 'Majakas' }
        ],
        optionalServices: [ 0x180A ]
    });

    const server = await device.gatt.connect();
    const service = await server.getPrimaryService(0x180A);
    const characteristic = await service.getCharacteristic(0x2A29);
    let value = await characteristic.readValue();

    return value;
    //let ready = await writeOutput(value);
}

document.getElementById('connect').addEventListener('click', () => {
	start().then((value) => {
        output.innerText = decoder.decode(value);
        console.log(decoder.decode(value));
    });
});

// let win1251decoder = new TextDecoder('windows-1251');
// let bytes = new Uint8Array([207, 240, 232, 226, 229, 242, 44, 32, 236, 232, 240, 33]);
// console.log(win1251decoder.decode(bytes)); // Привет, мир!