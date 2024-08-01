import os

def generate_markdown(directory, depth=0, ignore_dirs=None, ignore_files=None):
    if ignore_dirs is None:
        ignore_dirs = {'.git', 'node_modules', '__pycache__', 'innodb_temp', 'mysql', 'performance_schema'}
    if ignore_files is None:
        ignore_files = {'*.sdi', '*.pem', '*.ibd', '*.ibt', '*.dblwr'}  # Ví dụ loại trừ tệp có đuôi nhất định

    markdown = ""
    for item in os.listdir(directory):
        path = os.path.join(directory, item)
        if os.path.isdir(path):
            if item not in ignore_dirs:
                markdown += f"{'  ' * depth}- {item}/\n"
                markdown += generate_markdown(path, depth + 1, ignore_dirs, ignore_files)
        else:
            if not any(item.endswith(ext) for ext in ignore_files):
                markdown += f"{'  ' * depth}- {item}\n"
    return markdown

root_directory = "."  # Đường dẫn đến thư mục gốc của dự án, ở đây là thư mục hiện tại
structure = generate_markdown(root_directory)

with open("structure.md", "w") as file:
    file.write("# Project Structure\n\n")
    file.write(structure)
