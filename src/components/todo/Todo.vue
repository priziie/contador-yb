<template>
  <div>
    <img src="config.png" alt @click="goToConfig" />
    <section class="todo">
      <ul class="todo-list">
        <li class="right date">{{ date }}</li>
        <li class="time" v-if="timePerPersonString != '-'">
          Para que todas puedan pasar,
          <br />
          cada una tiene {{timePerPersonString}}
        </li>
        <li class="separator" v-else></li>

        <li v-if="infoText != ''" v-html="infoText"></li>
        <div class="pending-list">
          <List :items="pending" nameProp="pending" :status="false" @disable="disablePeople" />
        </div>

        <div class="add-list">
          <li>
            <input type="checkbox" id="pnew" />
            <label class="toggle" for="pnew"></label>
            <input
              type="text"
              placeholder="Escribe tu nombre.."
              v-model="people"
              @focusout="addPeople"
              @keydown.enter="addPeople"
            />
          </li>
        </div>

        <li></li>
        <div class="done-list">
          <List :items="done" nameProp="done" :status="true" />
        </div>
      </ul>
    </section>
  </div>
</template>

<script>
import List from "./List";

import { db } from "../../db.js";

/* eslint-disable */
var peopleRef = db.ref("people");

export default {
  components: {
    List
  },
  data() {
    return {
      people: "",
      curDate: new Date(),
      infoText: ""
    };
  },
  created() {
    var th = this;
    var infTexRef = db.ref("config/infoText");
    infTexRef.once("value", function(snapshot) {
      th.infoText = snapshot.val().replace(/\n/g, "<br>");
    });
  },
  firebase() {
    return {
      list: peopleRef.orderByChild("date").equalTo(this.shortDate),
      from: {
        source: db.ref("config/from"),
        asObject: true
      },
      to: {
        source: db.ref("config/to"),
        asObject: true
      },
      events: db.ref("config/events")
    };
  },
  computed: {
    done() {
      return this.list.filter(people => people.status);
    },
    pending() {
      let newList = this.list.filter(people => !people.status);
      // si hay mas de una pendiente, haacer el calculo
      let totalPeople = newList.length;
      if (totalPeople > 1) {
        //tiempo estimado en milisecungo
        let val = this.totalTime();
        // console.log("val",val)
        var countTime = this.transformToDate(this.from).getTime();
        var toTime = this.transformToDate(this.to).getTime();
        if (
          this.curDate.getTime() > countTime &&
          this.curDate.getTime() < toTime
        ) {
          countTime = this.curDate.getTime();
        }
        let options = { hour12: true, hour: "numeric", minute: "numeric" };
        //lo que tienen en milisegundos
        val = val / totalPeople;

        newList = newList.map(x => {
          //primero, transformo a horas el valor
          let fromDate = new Date(countTime);
          // console.log("fromDate",fromDate)
          let timeFrom = fromDate.toLocaleTimeString("es-SV", options);
          // sumo el tiempo que le queda
          countTime += val;
          //revisar si este tiempo no se traslapa con un evento
          let toDate = new Date(countTime);

          // console.log("toDate",toDate)
          let th = this;
          let found = this.events.find(e => {
            let eFrom = th.transformToDate(e.from);
            let eTo = th.transformToDate(e.to);
            //console.log("from TUrno",fromDate.getTime(),"<= to Evento", eTo.getTime())
            //console.log("to Turno",toDate.getTime(),">= from Evento", eFrom.getTime())
            return (
              fromDate.getTime() <= eTo.getTime() &&
              toDate.getTime() >= eFrom.getTime()
            );
          });

          // si encontró algún traslape, entonces adelantar las horas del traslape
          if (found) {
            // verificar si se traslapa por la fecha inicio o fin y que hacer en cada caso
            //4 casos de traslape
            /**
             * 1. Evento en medio del turno de alguien
             * 2. Evento comienza en medio del turno de alguien y termina después del turno
             * 3. Evento empieza antes del turno de alguien y termina en medio del turno
             * 4. Evento empieza antes del turno de alguien y termina después del turno.
             */

            let eFrom = this.transformToDate(found.from);
            let eTo = this.transformToDate(found.to);
            //1. y 2.
            if (eFrom > fromDate) {
              //console.log("entro if")
              // habrán dos fechas
              //la primera desde el inicio de su turno hasta el inicio del evento
              toDate = eFrom;

              // hora fin del turno actual menos la nueva hora fin
              let leftTime = countTime - toDate.getTime();
              // cambio hora fin a nueva  hora fin
              countTime = toDate.getTime();
              //hago string de primer tiempo de turno.

              let timeTo = toDate.toLocaleTimeString("es-SV", options);
              let time = timeFrom + " - " + timeTo;

              x["time"] = time.replace("p. m.", "").replace("a. m.", "");

              // la segunda fecha será desde el fin del evento, al fin del resto del turno que le quedaba
              fromDate = eTo;
              timeFrom = fromDate.toLocaleTimeString("es-SV", options);

              countTime = fromDate.getTime() + leftTime;
              toDate = new Date(countTime);

              timeTo = toDate.toLocaleTimeString("es-SV", options);
              time = timeFrom + " - " + timeTo;

              x["time"] =
                "<div>" +
                x.time +
                "</div>" +
                "<div>" +
                time.replace("p. m.", "").replace("a. m.", "") +
                "</div>";
              x["twoHours"] = true;
            } //caso 3. y 4.
            else {
              console.log("entro else");
              //solo es de adelantar la hora de inicio a por la fin del evento
              fromDate = eTo;
              timeFrom = fromDate.toLocaleTimeString("es-SV", options);

              countTime = fromDate.getTime() + val;
              toDate = new Date(countTime);

              let timeTo = toDate.toLocaleTimeString("es-SV", options);
              let time = timeFrom + " - " + timeTo;

              x["time"] = time.replace("p. m.", "").replace("a. m.", "");
            }
          } else {
            let timeTo = toDate.toLocaleTimeString("es-SV", options);
            let time = timeFrom + " - " + timeTo;
            x["time"] = time.replace("p. m.", "").replace("a. m.", "");
          }
          return x;
        });
      }
      return newList;
    },
    date() {
      let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      return this.curDate.toLocaleDateString("es-SV", options);
    },
    shortDate() {
      let options = { year: "2-digit", month: "2-digit", day: "2-digit" };
      return this.curDate.toLocaleDateString("es-SV", options);
    },
    time() {
      return this.curDate.toLocaleTimeString("es-SV");
    },
    timePerPersonString() {
      let length = this.list.filter(people => !people.status).length;
      if (length > 1) {
        let totalInMilSec = this.totalTime() / length;
        console.log("totalInMilSec", totalInMilSec);

        let minutes = totalInMilSec / 60000;
        let hours = totalInMilSec / 3600000;

        if (minutes < 60) {
          let aprox = Math.floor(minutes);
          return aprox + " min";
        } else {
          let integer = Math.floor(hours);
          let decimal = hours % 1;
          if (decimal > 0) {
            //convertirla a minutos multiplicando por 60
            decimal *= 60;
            decimal = Math.round(decimal * 100) / 100;
            decimal = Math.floor(decimal);
            return integer + "h " + decimal + "m";
          }
          return integer + "h";
        }
      }
      return "-";
    }
  },
  methods: {
    addPeople() {
      if (this.people != "") {
        var newPeople = {
          name: this.people,
          status: false,
          date: this.shortDate,
          hour: this.time
        };
        peopleRef.push(newPeople);
        this.people = "";
      }
    },
    disablePeople(object, event) {
      if (event.target.checked) {
        peopleRef
          .child(object[".key"])
          .child("status")
          .set(true);
      }
    },
    goToConfig() {
      this.$router.replace("/config");
    },
    totalTime() {
      let totalVal = this.totalEstimatedTime(this.from, this.to);

      //acumulado de eventos.
      let accEvent = 0;
      this.events.forEach(e => {
        console.log("accEvent", accEvent);
        accEvent += this.totalEstimatedTime(e.from, e.to);
        console.log("accEvent", accEvent);
      });
      // console.log("eventos",accEvent/60000, "total", totalVal/60000)

      //lo que tienen en milisegundos
      return totalVal - accEvent;
    },
    totalEstimatedTime(from, to) {
      if (!from || !to) {
        return 0;
      }
      let fromDate = this.transformToDate(from).getTime();
      let toDate = this.transformToDate(to).getTime();

      // console.log("fromDate",fromDate)
      // console.log("toDate",toDate)
      //si la hora actual esta entre el minimo y maximo, setear la hora actual
      if (
        this.curDate.getTime() > fromDate &&
        this.curDate.getTime() < toDate
      ) {
        fromDate = this.curDate.getTime();
      }
      // console.log("fromDate",fromDate)

      return toDate - fromDate;
    },
    transformToDate(object) {
      let date = new Date();

      //validar formato 12h
      let hours = parseInt(object.hour);
      if (object.ampm == "PM" && hours != 12) hours += 12;
      date.setHours(hours, object.minutes);
      // console.log("date",date)
      return date;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./style.css"></style>
