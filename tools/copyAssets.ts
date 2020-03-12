import * as shell from "shelljs"

shell.mkdir("-p", "build/resources/views")
shell.mkdir("-p", "build/database/seeds")

shell.cp("-R", "src/public", "build/public")
shell.cp("-R", "src/resources/views", "build/resources/")
shell.cp("-R", "src/database/seeds", "build/database/")
