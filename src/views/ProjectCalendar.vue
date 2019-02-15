<template>
    <v-container>
        <calendar style="height: 800px;overflow-x: auto;"
            :calendars="calendarList"
            :schedules="scheduleList"
            :view="view"
            :taskView="taskView"
            :scheduleView="scheduleView"
            :theme="theme"
            :week="week"
            :month="month"
            :timezones="timezones"
            :disableDblClick="disableDblClick"
            :isReadOnly="isReadOnly"
            :template="template"
            :useCreationPopup="useCreationPopup"
            :useDetailPopup="useDetailPopup"
        />        
    </v-container>

</template>

<script>
import 'tui-calendar/dist/tui-calendar.css'
import { Calendar } from '@toast-ui/vue-calendar'

export default {
    components: {
        'calendar': Calendar
    },
    data: function() {
        return {
            calendarList: [
                {
                    id: '0',
                    name: 'home'
                },
                {
                    id: '1',
                    name: 'office'
                }
            ],
            scheduleList: [
                {
                    id: '1',
                    calendarId: '1',
                    title: 'my schedule',
                    category: 'time',
                    dueDateClass: '',
                    start: '2019-02-15T10:30:00',
                    end: '2019-02-15T19:30:00'
                },
                {
                    id: '2',
                    calendarId: '1',
                    title: 'second schedule',
                    category: 'time',
                    dueDateClass: '',
                    start: new Date().toISOString(),
                    end: new Date().toISOString()
                }
            ],
            view: 'week',
            taskView: false,
            scheduleView: true,
            theme: {
                'month.dayname.height': '30px',
                'month.dayname.borderLeft': '1px solid #ff0000',
                'month.dayname.textAlign': 'center',
                'week.today.color': '#333',
                'week.daygridLeft.width': '100px',
                'week.timegridLeft.width': '100px'
            },
            week: {
                narrowWeekend: true,
                showTimezoneCollapseButton: true,
                timezonesCollapsed: false
            },
            month: {
                visibleWeeksCount: 6,
                startDayOfWeek: 1
            },
            timezones: [{
                timezoneOffset: 0,
                displayLabel: 'GMT+00:00',
                tooltip: 'Greenwich'
            }],
            disableDblClick: true,
            isReadOnly: false,
            template: {
                monthGridHeader: function(model) {
                    var date = new Date(model.date);
                    var template = '<span class="tui-full-calendar-weekday-grid-date">' + date.getDate() + '</span>';
                    return template;
                },
                milestone: function(schedule) {
                    return `<span style="color:red;">${schedule.title}</span>`;
                },
                milestoneTitle: function() {
                    return 'MILESTONE';
                },
            },
            useCreationPopup: true,
            useDetailPopup: false,
        }
    },
    methods: {
        onAfterRenderSchedule(e) {
            // implement your code
        },
        onBeforeCreateSchedule(e) {
            // implement your code
        },
        onBeforeDeleteSchedule(e) {
            // implement your code
        },
        onBeforeUpdateSchedule(e) {
            // implement your code
        },
        onClickDayname(e) {
            // implement your code
        },
        onClickSchedule(e) {
            // implement your code
        },
        onClickTimezonesCollapseBtn(e) {
            // implement your code
        }
    }
}
</script>

<style scoped>

</style>

