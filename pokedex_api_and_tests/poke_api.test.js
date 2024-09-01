test('Testing poke API id 37 is for a vulpix', async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + 37);
    const data = await response.json();

    expect(data.name).toEqual('vulpix');
    expect(data.moves.length).toEqual(87);
});

test('Testing poke API id 38 is for a vulpix', async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + 38);
    const data = await response.json();

    expect(data.name).toEqual('ninetales');
    expect(data.moves.length).toEqual(97);
});