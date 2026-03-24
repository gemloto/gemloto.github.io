package es.gva.edu.iesjuandegaray.bicis;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import java.io.IOException;

public class ValenbiciAPI {
    private static final String API_URL = 
        "https://valencia.opendatasoft.com/api/explore/v2.1/catalog/datasets/valenbisi-disponibilitat-valenbisi-dsiponibilidad/records?limit=20";

    public static void main(String[] args) {
        if (API_URL.isEmpty()) {
            System.err.println("La URL de la API no está especificada.");
            return;
        }

        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            HttpGet request = new HttpGet(API_URL);
            HttpResponse response = httpClient.execute(request);

            HttpEntity entity = response.getEntity();
            if (entity != null) {
                String result = EntityUtils.toString(entity);
                System.out.println("Respuesta de la API recibida correctamente.");

                try {
                    JSONObject jsonObject = new JSONObject(result);
                    JSONArray resultsArray = jsonObject.getJSONArray("results");

                    // Recorre el vector resultsArray mostrando los datos solicitados.
                    System.out.println("\nLISTADO ESTACIONES VALENBISI:");
                    for (int i = 0; i < resultsArray.length(); i++) {
                        JSONObject est = resultsArray.getJSONObject(i);
                        System.out.println("Estación " + (i+1) + ": " + est.getString("address"));
                        System.out.println("  Bicicletas disponibles: " + est.getInt("available"));
                        System.out.println("  Espacios disponibles: " + est.getInt("free"));
                        System.out.println("---");
                    }

                } catch (org.json.JSONException e) {
                    System.err.println("Error JSON: " + e.getMessage());
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}