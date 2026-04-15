         // he cambiado el modo a 2026
        //const url="https://valencia.opendatasoft.com/api/explore/v2.1/catalog/datasets/valenbisi-disponibilitat-valenbisi-dsiponibilidad/records?limit=100";
        const url="https://geoportal.valencia.es/server/rest/services/OPENDATA/Trafico/MapServer/228/query?where=1=1&outFields=*&f=json"
        proj4.defs('EPSG:25830', '+proj=utm +zone=30 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');

        // Definición de proyección para convertir coordenadas [web:22]
        let map = null;
        let results = document.getElementById('results');

        let getStationsButton = document.getElementById('getStations');
        getStationsButton.addEventListener('click', getStations);
        
        // Muestra los datos results
        // y en la consola
        // No lo uso, solo para pruebas
        function showData(cadena){
            results.innerHTML += cadena;
            console.log(cadena);

        }

        // ** COMPLETALO ***
        // Obtiene las estaciones de valenbisi, las muestra en una tabla y en un mapa
        function getStations() {
            console.log("Cargando estaciones...");
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    // carga los datos en la tabla
                    results.innerHTML = '';
                    let table = document.createElement('table');
                    let tr = document.createElement('tr');      
                    tr.className = "title";              
                    tr.innerHTML = `
                        <th>Dirección</th>
                        <th>Número</th>
                        <th>Abierto</th>
                        <th>Disponibles</th>
                        <th>Libres</th>
                        <th>Total</th>
                        <th>Actualizado</th>
                        <th>Coordenadas</th>`
                    table.appendChild(tr);

                    // Bloque principal que faltaba en la práctica
                    data.features.forEach(estacion => {
                        let attrs = estacion.attributes;
                        let fila = document.createElement("tr");
                        let abiertoTexto = attrs.open === "T" ? "Sí" : "No";
                        let claseEstado = attrs.open === "T" ? "estado-abierto" : "estado-cerrado";
                        let coordenadasTexto = `${estacion.geometry.x}, ${estacion.geometry.y}`;
                    
                        fila.innerHTML = `
                            <td>${attrs.address}</td>
                            <td>${attrs.number}</td>
                            <td class="${claseEstado}">${abiertoTexto}</td>
                            <td>${attrs.available}</td>
                            <td>${attrs.free}</td>
                            <td>${attrs.total}</td>
                            <td>${attrs.updated_at}</td>
                            <td>${coordenadasTexto}</td>
                        `;
                         table.appendChild(fila);
                    });

                    results.appendChild(table);
                    // COMPLETAR AQUI
                    // bucle 
                    // las bicicletas están en data.features
                    // recorrer las bicicletas y mostrarlas en la tabla
                    // FIN COMPLETAR
                    
                    // carga las estaciones en el mapa
                    loadMap(data);
                })

                .catch(error => {console.error('Error fetching data:', error);
                    results.innerHTML = "<p>Error al cargar las estaciones.</p>";
        });
        }

        // Geolocalizar en el mapa
        // convierte el JSON original a GeoJSON
        function convertToGeoJSON(datosOriginales) {
            return {
                type: "FeatureCollection",
                features: datosOriginales.features.map(item => {
                    // Reproyectar de UTM EPSG:25830 a WGS84
                    const [lon, lat] = proj4('EPSG:25830', 'EPSG:4326', [
                        item.geometry.x,
                        item.geometry.y
                    ]);
                    return {
                        type: "Feature",
                        geometry: {
                            type: "Point",
                            coordinates: [lon, lat]
                        },
                        properties: {
                            id: item.attributes.number,
                            direccion: item.attributes.address,
                            disponibles: item.attributes.available,
                            libres: item.attributes.free,
                            total: item.attributes.total,
                            actualizado: item.attributes.updated_at,
                            estado: item.attributes.open === "T" ? "Abierto" : "Cerrado",
                            necesita_ticket: item.attributes.ticket === "T"
                        }
                    };
                })
            };
        }

        // carga las estaciones en el mapa
        function loadMap(json){
            const geoJSONResultado = convertToGeoJSON(json);
            let inicioLon=geoJSONResultado.features[0].geometry.coordinates[0];
            let inicioLat=geoJSONResultado.features[0].geometry.coordinates[1];
            
            // Si el mapa ya existe, elimínalo antes de crear uno nuevo
            if (map !== null) {
                map.remove();
                map = null;
            }
            map = L.map('map').setView([inicioLat, inicioLon], 13);
            // Añade la capa base de OpenStreetMap
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);
            // Después de inicializar el mapa

            // Capa de datos con popups
            L.geoJSON(geoJSONResultado, {
                pointToLayer: (feature, latlng) => {
                return L.circleMarker(latlng, {
                    radius: 6,
                    color: feature.properties.disponibles > 0 ? 'green' : 'red',
                    weight: 1,
                    fillOpacity: 0.8
                });
                },
                onEachFeature: (feature, layer) => {
                    const props = feature.properties;
                    const contenidoPopup = `
                        <div class="popup-content">
                        <h4>${props.direccion}</h4>
                        <ul>
                            <li> ID: <strong>${props.id}</strong></li>
                            <li> Actualizado: ${props.actualizado}</li>
                            <li> Disponibles: ${props.disponibles}</li>
                            <li> Libres: ${props.libres}</li>
                            <li> Total: ${props.total}</li>
                            <li> Estado: ${props.estado}</li>                            
                        </ul>
                        </div>
                    `;
                    
                    layer.bindPopup(contenidoPopup, {
                        maxWidth: 300,
                        className: 'custom-popup'
                    });
                }
            }).addTo(map);
        }
        
        getStations();
        setInterval(getStations, 60000); // Refresca cada 60 segundos


