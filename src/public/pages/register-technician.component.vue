<script>
import axios from 'axios'

export default {
  name: 'register-technician',
  data() {
    return {
      technician: {
        name: '',
        specialty: '',
        location: '',
        available: '',
        ip: '',
        latitude: '',
        longitude: ''
      },
      technicians: []
    }
  },
  mounted() {
    this.getTechnicians()
  },
  methods: {
    getTechnicians() {
      axios.get('http://localhost:3000/technicians').then(res => {
        this.technicians = res.data
      })
    },
    registerTechnician() {
      axios.post('http://localhost:3000/technicians', this.technician).then(() => {
        this.getTechnicians()
        this.technician = {
          name: '',
          specialty: '',
          location: '',
          available: '',
          ip: '',
          latitude: '',
          longitude: ''
        }
      })
    },
    deleteTechnician(id) {
      axios.delete(`http://localhost:3000/technicians/${id}`).then(() => {
        this.getTechnicians()
      })
    }
  }
}
</script>

<template>
  <div>
    <h2>Registrar Técnico</h2>
    <form @submit.prevent="registerTechnician" class="form-container">
      <input v-model="technician.name" placeholder="Nombre" required />
      <input v-model="technician.specialty" placeholder="Especialidad" required />
      <input v-model="technician.location" placeholder="Distrito" required />
      <input v-model="technician.available" placeholder="Disponibilidad" required />
      <input v-model="technician.ip" placeholder="IP" required />
      <input v-model="technician.latitude" placeholder="Latitud" type="number" step="any" required />
      <input v-model="technician.longitude" placeholder="Longitud" type="number" step="any" required />
      <button type="submit">Registrar técnico</button>
    </form>

    <div class="table-container" v-if="technicians.length">
      <h3>Lista de Técnicos</h3>
      <table>
        <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Especialidad</th>
          <th>Distrito</th>
          <th>IP</th>
          <th>Latitud</th>
          <th>Longitud</th>
          <th>Acciones</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(t, index) in technicians" :key="t.id">
          <td>{{ index + 1 }}</td>
          <td>{{ t.name }}</td>
          <td>{{ t.specialty }}</td>
          <td>{{ t.location }}</td>
          <td>{{ t.ip }}</td>
          <td>{{ t.latitude }}</td>
          <td>{{ t.longitude }}</td>
          <td>
            <button class="delete-button" @click="deleteTechnician(t.id)">🗑️</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
h2 {
  color: #1E3A8A;
  margin-bottom: 1rem;
  font-weight: bold;
}

.form-container {
  background-color: #F0F9FF;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(30, 64, 175, 0.1);
  margin: 2rem auto;
  width: 95%;
  max-width: 900px;
}

input {
  background-color: #fff;
  border: 1px solid #93C5FD;
  border-radius: 6px;
  padding: 0.6rem 0.75rem;
  width: 100%;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  color: #1E3A8A;
}

button {
  background-color: #2563EB;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #1D4ED8;
}

.table-container {
  margin-top: 3rem;
  padding: 2rem;
  background-color: #F8FAFC;
  border-radius: 12px;
  width: 95%;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

th {
  background-color: #3B82F6;
  color: white;
  padding: 0.75rem;
}

td {
  padding: 0.75rem;
  border-bottom: 1px solid #DBEAFE;
  color: #000000;
}

tr:nth-child(even) {
  background-color: #EFF6FF;
}

.delete-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.delete-button:hover {
  color: #DC2626;
}
</style>
