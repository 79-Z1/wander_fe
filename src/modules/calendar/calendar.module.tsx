'use client';
import {FC} from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

import {formatToAMPM} from '@/common/utils';

import {IComponentBaseProps} from '@/common/interfaces';

export type TCalendarModuleProps = IComponentBaseProps & {
  calendars?: any;
};

const CalendarModule: FC<TCalendarModuleProps> = ({className, calendars}) => {
  const formatDayHeader = (info: any) => {
    if (info.view.type === 'timeGridWeek') {
      return info.date.getDate().toString();
    } else {
      const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
      return days[info.date.getDay()];
    }
  };

  const renderEventContent = (eventInfo: any) => {
    return (
      <p className="flex w-full cursor-pointer gap-1 truncate text-ellipsis rounded-full px-1">
        <b>{formatToAMPM(eventInfo.timeText)}:</b> <span>{eventInfo.event.title}</span>
      </p>
    );
  };

  const handleDateClick = (arg: any) => {
    alert(arg.dateStr);
  };

  return (
    <div className={className}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        eventColor="green"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        dayHeaderContent={formatDayHeader}
        firstDay={1}
        locale={'vi'}
        buttonText={{
          today: 'Hôm nay',
          month: 'Tháng',
          week: 'Tuần',
          day: 'Ngày',
          list: 'Danh sách'
        }}
        weekends={true}
        dateClick={e => handleDateClick(e)}
        eventClick={e => console.log('🚀 ~ e:::', e)}
        events={calendars || []}
        eventContent={renderEventContent}
        // editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        allDaySlot={false}
      />
    </div>
  );
};

export default CalendarModule;
