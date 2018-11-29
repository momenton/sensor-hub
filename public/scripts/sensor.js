(async () => {
  const fetchSensorData = async () => {
    const res = await fetch('/api/sensors');
    const responseJson = await res.json();
    return responseJson.data;
  };

  const refreshSensorTable = (data) => {
    // var _row = $(".mdl-data-dynamictable tbody").find('tr');
    const frag = document.createDocumentFragment();
    data.forEach((sensor) => {
      var template = document.querySelector('#sensorRowTemplate').innerHTML;
      var _newRow = template.replace(/{{container}}/gi, sensor.container);
      _newRow = _newRow.replace(/{{sensorId}}/gi, sensor.id);
      _newRow = _newRow.replace(/{{currentTemperature}}/gi, sensor.currentTemperature || 'None');
      _newRow = _newRow.replace(/{{minTemperature}}/gi, sensor.minTemperature);
      _newRow = _newRow.replace(/{{maxTemperature}}/gi, sensor.maxTemperature);
      const temp = document.createElement('template');
      temp.innerHTML = _newRow;
      frag.appendChild(temp.content);
    });

    document.querySelector(".dashboard table tbody").appendChild(frag);
    componentHandler.upgradeAllRegistered();
  };

  const data = await fetchSensorData();
  if (data.length) refreshSensorTable(data);
})();
