<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <label>
        File
        <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" />
      </label>

      <button v-on:click="submitFile()">Submit</button>
    </div>
    <div v-if="resumeResponse.length">
      <ul>
        <li v-for="(item,i) in resumeResponse" v-bind:key="i">{{item}}</li>
      </ul>
      <button type="button" v-on:click="onexport">Excel download</button>
      <!-- <vue-json-to-csv :json-data="resumeResponse"></vue-json-to-csv> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import XLSX from 'xlsx';


export default {
  
  /*
      Defines the data used by the component
    */
  data() {
    return {
      file: "",
      resumeResponse: []
    };
  },

  methods: {
    onexport () { // On Click Excel download button
    
      // export json to Worksheet of Excel
      // only array possible
      var resumeResponseWS = XLSX.utils.json_to_sheet(this.resumeResponse) 

      // A workbook is the name given to an Excel file
      var wb = XLSX.utils.book_new() // make Workbook of Excel

      // add Worksheet to Workbook
      // Workbook contains one or more worksheets
      XLSX.utils.book_append_sheet(wb, resumeResponseWS, 'resume') // sheetAName is name of Worksheet

      // export Excel file
      XLSX.writeFile(wb, 'resume.xlsx') // name of the file is 'book.xlsx'
    },

    
    /*
        Submits the file to the server
      */
    submitFile: function() {
      /*
                Initialize the form data
            */
      let formData = new FormData();
      let resArray = [];
      var self = this;
      self.resumeResponse = [];
      /*
                Add the form data we need to submit
            */
      formData.append("file", this.file);
      console.log(this.file);
      console.log("this", this.resumeResponse);

      /*
          Make the request to the POST /single-file URL
        */
      axios
        .post("http://localhost:3000/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(function(response) {
          console.log("SUCCESS!!", response.data);
          self.resumeResponse = response.data;
        })
        .catch(function(err) {
          console.log("FAILURE!!", err);
        });
    },

    /*
        Handles a change on the file upload
      */
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    }
  }
};
</script>