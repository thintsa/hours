#!/bin/bash

echo adding couple employees
curl -XPOST http://localhost/employees -d '_id=54f69b43896311471816340f&name=Timo&birthday=Aug%203,%201978&gender=false&photo=none'

curl -XPOST http://localhost/hours -d 'employee_id=54f69b43896311471816340f&date=Mar%203,%202015&category=Coding&hours=3'

curl -XPOST http://localhost/categories -d 'name=Project work'
curl -XPOST http://localhost/categories -d 'name=Maintenance'
curl -XPOST http://localhost/categories -d 'name=Lunch'
curl -XPOST http://localhost/categories -d 'name=Overtime'
