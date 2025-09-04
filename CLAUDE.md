# PACER Project [PACER Control] App

## Project Overview

This project, named “PACER,” is a software suite that provides operational support for the “WorldSkills” skills competition.

It consists of multiple software components interconnected via WebSocket and RESTful API.

## Software Overview

This directory will house the development of the “PACER Control” software.

It primarily handles information management for the competition and controls other software components.

## Technology Overview

### Backend
- Laravel
  - Using Laravel Sail.
  - Using MariaDB for the database.

### Frontend
- React
  - TailAdmin ([Reference: https://tailadmin.com/](https://tailadmin.com/)) is used as the UI
  - Implemented as a single-page application (SPA)

## Important Notes

- Please respond in Japanese only.
- If there are multiple TODOs, always execute Compact or confirm with me after completing one TODO.
- When performing Compact, “Compress only older history; do not compress recent history.”
- Always run Laravel via Laravel Sail.
- During development, do not run npm run build; always use npm run 
- If you have any questions, please search online.
- When searching online, please refer to official sources whenever possible.
- If you absolutely cannot resolve the issue yourself, please check with me before proceeding.
- The frontend should adhere to the components provided by TailAdmin as much as possible. If a component does not exist, create a new React component.
For information about TailAdmin, refer to the contents of /tailadmin-template.
