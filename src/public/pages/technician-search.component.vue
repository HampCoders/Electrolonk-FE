<script>
import axios from 'axios';
import L from 'leaflet';

export default {
  name: 'technician-search',
  data() {
    return {
      technicians: [],
      filteredTechnicians: [],
      searchLocation: '',
      ipToSearch: '',
      locationData: null,
      map: null,
      marker: null,
      mapInitialized: false,
      ipstackKey: '84c66ae7e127805745548245a5663687'
    };
  },
  mounted() {
    this.fetchTechnicians();
  },
  methods: {
    irAReviews() {
      this.$router.push('/contratacion-reviews');
    },
    async fetchTechnicians() {
      const res = await axios.get('http://localhost:3000/technicians');
      this.technicians = res.data;
      this.filteredTechnicians = res.data;
    },
    filtrarPorDistrito() {
      const filtro = this.searchLocation.trim().toLowerCase();
      this.filteredTechnicians = filtro === ''
        ? this.technicians
        : this.technicians.filter(tech =>
          tech.location.toLowerCase().includes(filtro)
        );
    },
    async obtenerUbicacionPorIP() {
      const ip = this.ipToSearch.trim();
      if (!ip) return;

      try {
        const response = await axios.get(`http://api.ipstack.com/${ip}?access_key=${this.ipstackKey}`);
        const data = response.data;
        this.locationData = {
          ip: data.ip,
          country: data.country_name,
          region: data.region_name,
          city: data.city,
          latitude: data.latitude,
          longitude: data.longitude
        };

        this.renderMap(data.latitude, data.longitude);

        const prefijo = this.extraerPrefijoIP(data.ip);
        this.filteredTechnicians = this.technicians.filter(tech =>
          tech.ip && tech.ip.startsWith(prefijo)
        );
      } catch (error) {
        alert('Error al obtener la ubicación por IP');
      }
    },
    extraerPrefijoIP(ip) {
      return ip.split('.').slice(0, 3).join('.');
    },
    renderMap(lat, lng) {
      if (this.mapInitialized) {
        this.map.setView([lat, lng], 14);
        if (this.marker) this.map.removeLayer(this.marker);
        this.marker = L.marker([lat, lng])
          .addTo(this.map)
          .bindPopup('Ubicación estimada por IP')
          .openPopup();
        return;
      }

      this.map = L.map('leaflet-map').setView([lat, lng], 14);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      this.marker = L.marker([lat, lng])
        .addTo(this.map)
        .bindPopup('Ubicación estimada por IP')
        .openPopup();

      this.mapInitialized = true;
    }
  }
};
</script>

<template>
  <div class="main-content">
    <div class="columns-container">
      <!-- Columna izquierda -->
      <div class="left-column">
        <h2>{{ $t('reviewIP.searchTitle') }}</h2>
        <div class="filters">
          <input v-model="searchLocation" :placeholder="$t('reviewIP.searchPlaceholder')" />
          <button @click="filtrarPorDistrito">{{ $t('reviewIP.searchButton') }}</button>
        </div>

        <div class="card" v-for="tech in filteredTechnicians" :key="tech.id">
          <div class="card-body">
            <div class="card-logo">
              <img :src="`https://ui-avatars.com/api/?name=${tech.name}&background=0D8ABC&color=fff`" :alt="tech.name" />
            </div>
            <div class="card-content">
              <h3>{{ tech.name }}</h3>
              <p>{{ tech.specialty }}</p>
              <p>{{ $t('reviewIP.available') }}: {{ tech.available }}</p>
              <p>{{ $t('reviewIP.district') }}: {{ tech.location }}</p>
              <button @click="irAReviews">{{ $t('reviewIP.seeMore') }}</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Columna derecha -->
      <div class="right-column">
        <h2>{{ $t('reviewIP.ipResultTitle') }}</h2>
        <div class="filters">
          <input v-model="ipToSearch" :placeholder="$t('reviewIP.ipPlaceholder')" />
          <button @click="obtenerUbicacionPorIP">{{ $t('reviewIP.searchButton') }}</button>
        </div>

        <div class="ip-info" v-if="locationData">
          <p><strong>{{ $t('reviewIP.ip') }}:</strong> {{ locationData.ip }}</p>
          <p><strong>{{ $t('reviewIP.country') }}:</strong> {{ locationData.country }}</p>
          <p><strong>{{ $t('reviewIP.region') }}:</strong> {{ locationData.region }}</p>
          <p><strong>{{ $t('reviewIP.city') }}:</strong> {{ locationData.city }}</p>
          <div id="leaflet-map"></div>
          <div class="map-button">
            <a :href="`https://www.google.com/maps?q=${locationData.latitude},${locationData.longitude}`" target="_blank">
              {{ $t('reviewIP.seeOnGoogleMaps') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import 'leaflet/dist/leaflet.css';
.main-content { padding: 24px; }
.columns-container {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}
.left-column, .right-column {
  flex: 1;
  background-color: #fff;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  min-width: 340px;
}
.filters {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.card {
  background-color: #f5f7fa;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
}
.card-body { display: flex; align-items: center; gap: 16px; }
.card-logo img { width: 64px; height: 64px; border-radius: 50%; object-fit: cover; }
.card-content h3 { margin: 0; font-weight: 600; color: #043873; }
.card-content p { margin: 4px 0; color: #333; }
#leaflet-map { height: 300px; width: 100%; border-radius: 12px; margin-top: 16px; }
.map-button { text-align: center; margin-top: 12px; }
.map-button a {
  background-color: #1976d2;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
}
</style>
