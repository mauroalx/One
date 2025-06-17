"use client";

import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  EventInput,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/core";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";

interface CalendarEvent extends EventInput {
  extendedProps: {
    calendar: string;
    serviceType?: string;
    technician?: string;
    address?: string;
    description?: string;
  };
}

const Calendar: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventLevel, setEventLevel] = useState("");
  const [eventServiceType, setEventServiceType] = useState("");
  const [eventTechnician, setEventTechnician] = useState("");
  const [eventAddress, setEventAddress] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedCity, setSelectedCity] = useState("Todas");
  const calendarRef = useRef<FullCalendar>(null);
  const { isOpen, openModal, closeModal } = useModal();

  const calendarsEvents = {
    Danger: "danger",
    Success: "success",
    Primary: "primary",
    Warning: "warning",
  };

  useEffect(() => {
    setEvents([
      {
        id: "1",
        title: "Event Conf.",
        start: new Date().toISOString().split("T")[0],
        extendedProps: { calendar: "Danger" },
      },
      {
        id: "2",
        title: "Meeting",
        start: new Date(Date.now() + 86400000).toISOString().split("T")[0],
        extendedProps: { calendar: "Success" },
      },
      {
        id: "3",
        title: "Workshop",
        start: new Date(Date.now() + 172800000).toISOString().split("T")[0],
        end: new Date(Date.now() + 259200000).toISOString().split("T")[0],
        extendedProps: { calendar: "Primary" },
      },
    ]);
  }, []);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    resetModalFields();
    setEventStartDate(selectInfo.startStr);
    setEventEndDate(selectInfo.endStr || selectInfo.startStr);
    openModal();
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event;
    setSelectedEvent(event as unknown as CalendarEvent);
    setEventTitle(event.title);
    setEventStartDate(event.start?.toISOString().split("T")[0] || "");
    setEventEndDate(event.end?.toISOString().split("T")[0] || "");
    setEventLevel(event.extendedProps.calendar);
    setEventServiceType(event.extendedProps.serviceType || "");
    setEventTechnician(event.extendedProps.technician || "");
    setEventAddress(event.extendedProps.address || "");
    setEventDescription(event.extendedProps.description || "");
    openModal();
  };

  const handleAddOrUpdateEvent = () => {
    if (selectedEvent) {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEvent.id
            ? {
                ...event,
                title: eventTitle,
                start: eventStartDate,
                end: eventEndDate,
                extendedProps: {
                  calendar: eventLevel,
                  serviceType: eventServiceType,
                  technician: eventTechnician,
                  address: eventAddress,
                  description: eventDescription,
                },
              }
            : event
        )
      );
    } else {
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        title: eventTitle,
        start: eventStartDate,
        end: eventEndDate,
        allDay: true,
        extendedProps: {
          calendar: eventLevel,
          serviceType: eventServiceType,
          technician: eventTechnician,
          address: eventAddress,
          description: eventDescription,
        },
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
    closeModal();
    resetModalFields();
  };

  const resetModalFields = () => {
    setEventTitle("");
    setEventStartDate("");
    setEventEndDate("");
    setEventLevel("");
    setEventServiceType("");
    setEventTechnician("");
    setEventAddress("");
    setEventDescription("");
    setSelectedEvent(null);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex items-center gap-4 p-4 border-b border-gray-200 dark:border-gray-700">
        <span className="text-sm font-medium text-gray-700 dark:text-white">Cidade:</span>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="rounded border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        >
          <option>Todas</option>
          <option>Fortaleza</option>
          <option>Juazeiro</option>
          <option>Quixadá</option>
        </select>
      </div>
      <div className="custom-calendar">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next addEventButton",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
          selectable={true}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventContent={renderEventContent}
          customButtons={{
            addEventButton: {
              text: "Agendar +",
              click: openModal,
            },
          }}
        />
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] max-h-[650px] p-4 lg:p-10 overflow-y-auto">
        <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
          <div>
            <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
              {selectedEvent ? "Visualizar evento" : "Adicionar evento"}
            </h5>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Abertura rápida de eventos para agendamento de serviços.
            </p>
          </div>

          {/** Variável de controle visualização */}
          {(() => {
            const isViewMode = !!selectedEvent;

            return (
              <>
                <div className="mt-8 space-y-6">
                  <Input label="Cliente" value={eventTitle} onChange={setEventTitle} disabled={isViewMode} />
                  <Input label="Tipo de Serviço" value={eventServiceType} onChange={setEventServiceType} disabled={isViewMode} />
                  <Input label="Técnico Responsável" value={eventTechnician} onChange={setEventTechnician} disabled={isViewMode} />
                  <Input label="Endereço" value={eventAddress} onChange={setEventAddress} disabled={isViewMode} />
                  <Textarea label="Descrição" value={eventDescription} onChange={setEventDescription} disabled={isViewMode} />
                </div>

                <div className="mt-6">
                  <label className="block mb-4 text-sm font-medium text-gray-700 dark:text-gray-400">
                    Event Color
                  </label>
                  <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                    {Object.entries(calendarsEvents).map(([key, value]) => (
                      <div key={key} className="n-chk">
                        <div className={`form-check form-check-${value} form-check-inline`}>
                          <label className="flex items-center text-sm text-gray-700 form-check-label dark:text-gray-400" htmlFor={`modal${key}`}>
                            <span className="relative">
                              <input
                                className="sr-only form-check-input"
                                type="radio"
                                name="event-level"
                                value={key}
                                id={`modal${key}`}
                                checked={eventLevel === key}
                                onChange={() => setEventLevel(key)}
                                disabled={isViewMode}
                              />
                              <span className="flex items-center justify-center w-5 h-5 mr-2 border border-gray-300 rounded-full box dark:border-gray-700">
                                <span className="w-2 h-2 bg-white rounded-full dark:bg-transparent"></span>
                              </span>
                            </span>
                            {key}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <Input label="Início" value={eventStartDate} onChange={setEventStartDate} type="date" disabled={isViewMode} />
                  <Input label="Previsão de término" value={eventEndDate} onChange={setEventEndDate} type="date" disabled={isViewMode} />
                </div>

                <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
                  <button onClick={closeModal} type="button" className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto">
                    Fechar
                  </button>

                  {!isViewMode && (
                    <button onClick={handleAddOrUpdateEvent} type="button" className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto">
                      Adicionar
                    </button>
                  )}
                </div>
              </>
            );
          })()}
        </div>
      </Modal>


    </div>
  );
};

const Input = ({ label, value, onChange, type = "text", disabled }: { label: string; value: string; onChange: (val: string) => void; type?: string; disabled?: boolean }) => (
  <div>
    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">{label}</label>
    <input
      type={type}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
    />
  </div>
);

const Textarea = ({ label, value, onChange, disabled }: { label: string; value: string; onChange: (val: string) => void; disabled?: boolean; }) => (
  <div>
    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">{label}</label>
    <textarea
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      rows={3}
      className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
    />
  </div>
);

const renderEventContent = (eventInfo: EventContentArg) => {
  const colorClass = `fc-bg-${eventInfo.event.extendedProps.calendar.toLowerCase()}`;
  return (
    <div className={`event-fc-color flex fc-event-main ${colorClass} p-1 rounded`}>
      <div className="fc-daygrid-event-dot"></div>
      <div className="fc-event-time">{eventInfo.timeText}</div>
      <div className="fc-event-title">{eventInfo.event.title}</div>
    </div>
  );
};

export default Calendar;
