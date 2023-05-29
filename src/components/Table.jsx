import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faHourglass } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import { useForm } from "react-hook-form";
import { FormDatePicker } from "./FormDatePicker";
import { FormTimePicker } from "./FormTimePicker";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import { useRouter } from "next/router";
import { getWeek, getMonth, filterByDateOrRange, resetTimeOnDate, dateExistsInSelected } from "../utils/utils";

import convertToDateType from "../utils/utils";
import { Dropdown } from "antd";

import { TableDatePicker } from "./TableDatePicker";
import { StatusPicker } from "./StatusPicker";

// import data from "../utils/data"; //temporal mientras se conecta la db
import { useState, useEffect } from "react";

export default function Table() {
  const [appointments, setAppointments] = useState([]);
  const [modalShown, setModalShown] = useState(false);
  const [selectedDateOrRange, setSelectedDateOrRange] = useState([resetTimeOnDate(new Date())]);
  const [search, setSearch] = useState("");
  const { register, handleSubmit, reset, control, setValue } = useForm();
  const [modalType, setModalType] = useState("Crear");
  const { reload } = useRouter();
  dayjs.extend(updateLocale);
  dayjs.updateLocale("en", {
    weekStart: 1,
  });

  // Debugging Purpuses only

  // Get the data
  useEffect(() => {
    const fetchData = async () => {
      try {
        //fetch todas las citas de la base de datos
        const res = await fetch("http://localhost:3000/api/appoint");
        const ret = await res.json();

        setAppointments(ret);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // Create an appointment

  async function addNewAppointment(inputs) {
    if (inputs.servicio === "Servicio") inputs.servicio = "Corte de cabello";

    inputs.fecha = dayjs(inputs.fecha).format("DD-MM-YYYY");
    inputs.hora = dayjs(inputs.hora).format("h:mm a");
    inputs.estado = "Citado";

    reset({
      fecha: "",
      hora: "",
      nombre: "",
      servicio: "Servicio",
      telefono: "",
    });

    try {
      await fetch("http://localhost:3000/api/appoint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });
      console.log(inputs);
    } catch (error) {
      console.log(error);
    }
    await reload("/admin");
    setModalShown(false);
  }

  async function updateAppointment(inputs) {
    //base de datos

    if (!(inputs.fecha instanceof Date)) inputs.fecha = inputs.fecha.toDate();
    inputs.fecha = resetTimeOnDate(inputs.fecha);

    inputs.fecha = dayjs(inputs.fecha).format("DD-MM-YYYY");
    inputs.hora = dayjs(inputs.hora).format("h:mm a");

    const newAppointments = appointments.map(item => {
      if (item._id === inputs._id) {
        return {
          _id: inputs._id,
          fecha: inputs.fecha,
          hora: inputs.hora,
          nombre: inputs.nombre,
          servicio: inputs.servicio,
          telefono: inputs.telefono,
          estado: inputs.estado,
        };
      }
      return item;
    });

    // !quitar
    setAppointments(newAppointments);

    reset({
      fecha: "",
      hora: "",
      nombre: "",
      servicio: "Servicio",
      telefono: "",
      _id: "",
      estado: "",
    });

    setModalShown(false);
  }

  function handleAddModalOpening() {
    setModalType("Crear");
    setModalShown(true);

    //reset inputs
    setValue("nombre", "");
    setValue("telefono", "");
    setValue("servicio", "Servicio");
    setValue("fecha", null);
    setValue("hora", null);
    setValue("_id", "");
    setValue("estado", "");
  }

  function handleEditModalOpening({ _id, nombre, telefono, servicio, hora, fecha, estado }) {
    setModalType("Actualizar");
    setModalShown(true);

    //Populate date and time inputs on form
    const auxFecha = fecha.split("-");
    fecha = new Date(+auxFecha[2], auxFecha[1] - 1, +auxFecha[0]);
    const convertTo24 = e => (e ? dayjs(`1/1/1 ${e}`).format("HH:mm:00") : null);
    hora = convertTo24(hora);
    hora = hora.split(":");
    hora = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), hora[0], hora[1], hora[2]);

    setValue("nombre", nombre);
    setValue("telefono", telefono);
    setValue("servicio", servicio);
    setValue("fecha", fecha);
    setValue("hora", hora);
    setValue("_id", _id);
    setValue("estado", estado);
  }

  function handleDateChange(inputDate, type) {
    inputDate = resetTimeOnDate(inputDate.toDate());

    if (type === "date") {
      setSelectedDateOrRange([inputDate]);
    } else if (type === "week") {
      const { start, end } = getWeek(inputDate);
      setSelectedDateOrRange([start, end]);
    } else if (type === "month") {
      const { start, end } = getMonth(inputDate);
      setSelectedDateOrRange([start, end]);
    }
  }

  function handlePickerChange(picker) {
    if (picker === "date") {
      setSelectedDateOrRange([selectedDateOrRange[0]]);
    } else if (picker === "week") {
      const { start, end } = getWeek(selectedDateOrRange[0]);
      setSelectedDateOrRange([start, end]);
    } else if (picker === "month") {
      const { start, end } = getMonth(selectedDateOrRange[0]);
      setSelectedDateOrRange([start, end]);
    } else if (picker === "todas") {
      setSelectedDateOrRange([new Date("January 01, 2023"), new Date("December 31, 2023")]);
    }
  }

  async function handleDelete({ _id }) {
    // try {
    //   await fetch("http://localhost:3000/api/appoint", {
    //     method: "DELETE",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(id),
    //   });
    //   console.log(inputs);
    // } catch (error) {
    //   console.log(error);
    // }
  }

  function selectPreviousDay() {
    if (selectedDateOrRange.length === 1) {
      setSelectedDateOrRange(prev => [new Date(prev[0].getTime() - 86400000)]);
    } else if (selectedDateOrRange.length === 2) {
      if (selectedDateOrRange[1].getTime() - selectedDateOrRange[0].getTime() <= 604800000) {
        const { start, end } = getWeek(new Date(selectedDateOrRange[0].getTime() - 604800000)); //get previous week range
        setSelectedDateOrRange([start, end]);
      } else {
        let previousMonth = selectedDateOrRange[0];
        previousMonth.setDate(1);
        previousMonth.setMonth(previousMonth.getMonth() - 1);

        const { start, end } = getMonth(previousMonth); //get previous month range
        setSelectedDateOrRange([start, end]);
      }
    }
  }

  function selectNextDay() {
    if (selectedDateOrRange.length === 1) {
      setSelectedDateOrRange(prev => [new Date(prev[0].getTime() + 86400000)]);
    } else if (selectedDateOrRange.length === 2) {
      if (selectedDateOrRange[1].getTime() - selectedDateOrRange[0].getTime() <= 604800000) {
        const { start, end } = getWeek(new Date(selectedDateOrRange[0].getTime() + 604800000)); //get next week range
        setSelectedDateOrRange([start, end]);
      } else {
        let previousMonth = selectedDateOrRange[0];
        previousMonth.setDate(1);
        previousMonth.setMonth(previousMonth.getMonth() + 1);

        const { start, end } = getMonth(previousMonth); //get next month range
        setSelectedDateOrRange([start, end]);
      }
    }
  }

  return (
    <>
      <div className="flex">
        <div className="searchbar flex no-gap">
          <button className="btn">
            <FontAwesomeIcon className="icon-primary" icon={faMagnifyingGlass} />
          </button>
          <input value={search} className="input-accent" type="text" placeholder="Buscar" onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex small-gap">
          <button className="btn" onClick={selectPreviousDay}>
            <FontAwesomeIcon className="icon-primary" icon={faChevronLeft} />
          </button>
          <Dropdown
            overlayClassName="date-dropdown"
            trigger={["click"]}
            placement="bottom"
            dropdownRender={() => (
              <TableDatePicker
                handleDateChange={handleDateChange}
                handlePickerChange={handlePickerChange}
                selectedDate={selectedDateOrRange}
              />
            )}
          >
            <div className="btn" style={{ width: "16.5rem", justifyContent: "space-between" }}>
              <p className="accent-font">
                {dayjs(selectedDateOrRange[0]).format("DD-MM-YYYY")}
                {selectedDateOrRange.length === 2 && ` | ${dayjs(selectedDateOrRange[1]).format("DD-MM-YYYY")}`}
              </p>
              <FontAwesomeIcon className="icon-primary" icon={faChevronDown} />
            </div>
          </Dropdown>
          <button className="btn" onClick={selectNextDay}>
            <FontAwesomeIcon className="icon-primary" icon={faChevronRight} />
          </button>
        </div>
        <button className="btn" onClick={handleAddModalOpening}>
          <FontAwesomeIcon className="icon-primary" icon={faPlus} />
          <p className="accent-font">Nueva Cita</p>
        </button>
      </div>
      <div className="table flex-column">
        <div className="table-item table-head">
          <h3>Fecha</h3>
          <h3>Hora</h3>
          <h3>Nombre</h3>
          <h3>Servicio</h3>
          <h3>Telefono</h3>
          <h3>Estado</h3>
          <div></div>
          <button className="btn btn-small">
            <FontAwesomeIcon className="icon-primary" icon={faSort} />
          </button>
        </div>

        {appointments
          .filter(i => {
            if (selectedDateOrRange.length === 1) {
              return convertToDateType(i.fecha).getTime() === selectedDateOrRange[0].getTime();
            } else if (selectedDateOrRange.length === 2) {
              return (
                convertToDateType(i.fecha).getTime() >= selectedDateOrRange[0].getTime() &&
                convertToDateType(i.fecha).getTime() <= selectedDateOrRange[1].getTime()
              );
            }
          })
          .filter(
            e =>
              e.nombre.toLowerCase().includes(search) ||
              e.telefono.includes(search) ||
              e.servicio.toLowerCase().includes(search) ||
              e.estado.toLowerCase().includes(search) ||
              e.fecha.toLowerCase().includes(search) ||
              e.hora.toLowerCase().includes(search)
          )
          .map(e => {
            return (
              <div key={e._id} className="table-item table-row">
                <p className="small-font">{e.fecha}</p>
                <p className="small-font">{e.hora}</p>
                <p className="small-font">{e.nombre}</p>
                <p className="small-font">{e.servicio}</p>
                <p className="small-font">{e.telefono}</p>
                <Dropdown
                  className="btn btn-small btn-fixed-width"
                  trigger={["click"]}
                  placement="bottom"
                  dropdownRender={() => <StatusPicker statusPicked={e.estado} _id={e._id} />}
                >
                  <div>
                    <FontAwesomeIcon
                      icon={
                        (e.estado === "Citado" && faCalendar) ||
                        (e.estado === "Pendiente" && faClock) ||
                        (e.estado === "En curso" && faHourglass) ||
                        (e.estado === "Completado" && faCheck) ||
                        (e.estado === "Cancelado" && faXmark)
                      }
                      className="icon-secundary"
                    />
                    <p className="small-font">{e.estado}</p>
                  </div>
                </Dropdown>
                <button className="btn btn-small">
                  <FontAwesomeIcon className="icon-secundary" onClick={() => handleEditModalOpening(e)} icon={faPenToSquare} />
                </button>
                <button className="btn btn-small">
                  <FontAwesomeIcon className="icon-secundary" onClick={() => handleDelete(e)} icon={faTrash} />
                </button>
              </div>
            );
          })}

        <div className="table-footer flex align-bottom">
          <p className="small-font">Citas mostradas: {appointments.length}</p>
          <button className="btn btn-small btn-outline">
            <p className="small-font">Mostrar completadas</p>
          </button>
        </div>
      </div>

      {modalShown && (
        <div className="modal-container">
          <form onSubmit={handleSubmit(modalType === "Crear" ? addNewAppointment : updateAppointment)} className="modal flex-column">
            <h1 style={{ marginBottom: "1rem" }}>{modalType} cita</h1>
            <div className="flex" style={{ alignItems: "flex-start" }}>
              <div className="flex-column column-gap">
                <input type="text" {...register("_id")} disabled style={{ display: "none" }} />
                <input type="text" {...register("estado")} disabled style={{ display: "none" }} />
                <input placeholder="Nombre" {...register("nombre", { required: true, maxLength: 50 })} />
                <input placeholder="Telefono" {...register("telefono", { required: true, maxLength: 50 })} />
                <select {...register("servicio")} defaultValue="Servicio">
                  <option value="Servicio" disabled hidden>
                    Servicio
                  </option>
                  <option value="Corte de cabello">Corte de cabello</option>
                  <option value="Pintura de cabello">Pintura de cabello</option>
                  <option value="Maquillaje">Maquillaje</option>
                  <option value="Tinte">Tinte</option>
                </select>
              </div>
              <div className="flex-column column-gap">
                <FormDatePicker control={control} name="fecha" />
                <FormTimePicker control={control} name="hora" />
              </div>
            </div>
            <div className="flex align-right align-bottom">
              <button className="btn btn-secundary" onClick={() => setModalShown(false)}>
                <p>Cancelar</p>
              </button>
              <button className="btn" type="submit">
                <p className="accent-font">{modalType}</p>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
