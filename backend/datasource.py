"""
    Data Access Layer

    Note: Persisting data only in memory.
        Any modification of `/backend/` python code will reload server and erase it.
"""

from datetime import datetime
from enum import Enum
import uuid
import json


database = []

# case = {
#     case_id,
#     created_at,
#     status
# }

class Status(Enum):
    SUBMITTED = 'submitted'
    CREATED = 'created'
    DELETED = 'deleted'
    APPROVED = 'approved'
    DENIED = 'denied'


class DataAccessLayer:

    def get_case(self, case_id):
        """ Getting case data by matching case_id

        Args:
            case_id (_string_): 

        Returns:
            _list(dict)_: list containing case data, for now returning only 1 record/case/element
        """
        cases = [case for case in database if case['case_id'] == case_id] # faster than `filter`
        # case = list(filter(lambda case: case['case_id'] == case_id, database)) # slower than list comprehension

        if len(cases) == 0: # case id not found
            return cases

        case = self.get_case_sim(cases[0])
        return [case]


    def get_case_sim(self, case):
        """ Getting case data for simulation

        Args:
            case (_dict_): case data

        Returns:
            _dict_: case data merged with simulation data from json per time since creation
        """

        # calculating and loading simulated case data
        time_diff = (datetime.now() - case['created_at']).seconds
        if time_diff < 10:
            response_no = 1
        elif time_diff >= 10 and time_diff < 20:
            response_no = 2
        else:
            response_no = 3

        with open(f"../assets/response-{response_no}.json", encoding="UTF8") as file:
            json_data = json.load(file)

        # replacing simulated case data with actual saved case data points
        json_data['case_id'] = case['case_id']
        json_data['created_at'] = case['created_at']
        return json_data


    def get_cases(self):
        # return database # commenting it to apply simulation below to this endpoint too, as requested
        return [self.get_case_sim(case) for case in database]


    def create_case(self):
        case = {
            'case_id': str(uuid.uuid4()),
            'created_at': datetime.now(),
            'status': Status.SUBMITTED
        }
        database.append(case)
        return case
